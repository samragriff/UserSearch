using UserSearch.Core.Data;
using UserSearch.Core.Entities;

namespace UserSearch.Core.Commands.CreateUserCommand;

public class CreateUserCommandHandler(IUserRepository userRepository) : IRequestHandler<CreateUserCommand, Result<int>>
{
    public async Task<Result<int>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var validationErrors = Validate(request);
        if (validationErrors.Count != 0)
            return Result.Invalid(validationErrors);

        if (await userRepository.ExistsByEmailAsync(request.Email, cancellationToken))
            return Result.Conflict("A user with this email already exists");

        var user = new User
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            JobTitle = request.JobTitle.Trim(),
            Phone = request.Phone.Trim(),
            Email = request.Email.Trim()
        };

        await userRepository.AddAsync(user, cancellationToken);
        return Result.Success(user.Id);
    }

    private static List<ValidationError> Validate(CreateUserCommand request)
    {
        var errors = new List<ValidationError>();

        if (string.IsNullOrWhiteSpace(request.FirstName))
            errors.Add(new ValidationError("FirstName", "First name is required"));
        if (string.IsNullOrWhiteSpace(request.LastName))
            errors.Add(new ValidationError("LastName", "Last name is required"));

        // Bonus: phone validation (UK mobile 07xxx)
        if (!string.IsNullOrWhiteSpace(request.Phone))
        {
            var digits = new string(request.Phone.Where(char.IsDigit).ToArray());
            if (digits.Length != 11 || !digits.StartsWith("07"))
                errors.Add(new ValidationError("Phone", "Phone must be a valid UK mobile number (e.g. 07789 543768)"));
        }

        // Bonus: email validation
        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!emailRegex.IsMatch(request.Email))
                errors.Add(new ValidationError("Email", "Email must be a valid email address"));
        }
        else
        {
            errors.Add(new ValidationError("Email", "Email is required"));
        }

        return errors;
    }
}

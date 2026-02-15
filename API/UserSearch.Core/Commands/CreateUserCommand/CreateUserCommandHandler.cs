using UserSearch.Core.Data;
using UserSearch.Core.Entities;

namespace UserSearch.Core.Commands.CreateUserCommand;

public class CreateUserCommandHandler(IUserRepository userRepository) : IRequestHandler<CreateUserCommand, Result<int>>
{
    public async Task<Result<int>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        if (await userRepository.ExistsByEmailAsync(request.Email, cancellationToken))
            return Result.Invalid(new List<ValidationError> { new("Email", "A user with this email already exists") });

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
}

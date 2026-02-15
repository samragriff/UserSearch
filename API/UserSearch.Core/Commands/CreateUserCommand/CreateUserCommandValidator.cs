using FluentValidation;

namespace UserSearch.Core.Commands.CreateUserCommand;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required")
            .EmailAddress()
            .WithMessage("Email must be a valid email address");

        RuleFor(x => x.Phone)
            .Must(BeValidUkMobile)
            .When(x => !string.IsNullOrWhiteSpace(x.Phone))
            .WithMessage("Phone must be a valid UK mobile number (e.g. 07789 543768)");
    }

    private static bool BeValidUkMobile(string? phone)
    {
        if (string.IsNullOrWhiteSpace(phone)) return true;

        var digits = new string(phone.Where(char.IsDigit).ToArray());
        return digits.Length == 11 && digits.StartsWith("07");
    }
}

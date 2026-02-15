namespace UserSearch.Core.Commands.CreateUserCommand;

public record CreateUserCommand(string FirstName, string LastName, string JobTitle, string Phone, string Email)
    : IRequest<Result<int>>;

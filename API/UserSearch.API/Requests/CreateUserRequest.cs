namespace UserSearch.API.Requests;

internal record CreateUserRequest(
    string FirstName,
    string LastName,
    string JobTitle,
    string Phone,
    string Email);

using UserSearch.Core.Models;

namespace UserSearch.Core.Queries.GetUserQuery;

public record GetUserQuery(int UserId) : IRequest<UserDto?>;

using UserSearch.Core.Models;

namespace UserSearch.Core.Queries.SearchUsersQuery;

public record SearchUsersQuery(string SearchText) : IRequest<IReadOnlyList<UserDto>>;

using UserSearch.Core.Data;
using UserSearch.Core.Models;

namespace UserSearch.Core.Queries.SearchUsersQuery;

public class SearchUsersQueryHandler(IUserRepository userRepository) : IRequestHandler<SearchUsersQuery, IReadOnlyList<UserDto>>
{
    private const int MinSearchLength = 2;

    public async Task<IReadOnlyList<UserDto>> Handle(SearchUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await userRepository.SearchAsync(request.SearchText, MinSearchLength, cancellationToken);
        return users.Select(Map).ToList();
    }

    private static UserDto Map(Entities.User u) => new(u.Id, u.FirstName, u.LastName, u.JobTitle, u.Phone, u.Email);
}

using UserSearch.Core.Data;
using UserSearch.Core.Models;

namespace UserSearch.Core.Queries.GetUserQuery;

public class GetUserQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUserQuery, UserDto?>
{
    public async Task<UserDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByIdAsync(request.UserId, cancellationToken);
        return user is null ? null : new UserDto(user.Id, user.FirstName, user.LastName, user.JobTitle, user.Phone, user.Email);
    }
}

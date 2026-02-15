using UserSearch.Core.Entities;

namespace UserSearch.Core.Data;

public interface IUserRepository
{
    Task<IReadOnlyList<User>> SearchAsync(string searchText, int minLength, CancellationToken cancellationToken = default);
    Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task AddAsync(User user, CancellationToken cancellationToken = default);
}

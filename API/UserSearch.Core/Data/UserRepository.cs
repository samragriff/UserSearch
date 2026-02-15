using Microsoft.EntityFrameworkCore;
using UserSearch.Core.Entities;

namespace UserSearch.Core.Data;

public class UserRepository(UserDbContext dbContext) : IUserRepository
{
    public async Task<IReadOnlyList<User>> SearchAsync(string searchText, int minLength, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(searchText) || searchText.Length < minLength)
            return [];

        var term = searchText.Trim();
        return await dbContext.Users
            .Where(u => EF.Functions.Like(u.FirstName, $"%{term}%") ||
                        EF.Functions.Like(u.LastName, $"%{term}%"))
            .Take(20)
            .ToListAsync(cancellationToken);
    }

    public async Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
        await dbContext.Users.FindAsync([id], cancellationToken);

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default) =>
        await dbContext.Users.AnyAsync(u => u.Email == email, cancellationToken);

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await dbContext.Users.AddAsync(user, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}

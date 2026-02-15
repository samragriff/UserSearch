using Microsoft.EntityFrameworkCore;
using UserSearch.Core.Entities;

namespace UserSearch.Core.Data;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
}

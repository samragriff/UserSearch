using Microsoft.EntityFrameworkCore;
using UserSearch.Core.Data;
using UserSearch.Core.Entities;

namespace UserSearch.API;

public static class DataSeeder
{
    public static async Task SeedIfEmptyAsync(IServiceProvider services, CancellationToken cancellationToken = default)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<UserDbContext>();

        if (await db.Users.AnyAsync(cancellationToken))
            return;

        var users = new List<User>
        {
            new() { FirstName = "David", LastName = "Jones", JobTitle = "Developer", Phone = "07789 543768", Email = "djones@test.com" },
            new() { FirstName = "Lisa", LastName = "Holmes", JobTitle = "Developm", Phone = "07756 896512", Email = "lholmes@test.com" },
            new() { FirstName = "Alex", LastName = "Smith", JobTitle = "QA Lead", Phone = "07723 743289", Email = "asmith@test.com" },
            new() { FirstName = "Kieran", LastName = "James", JobTitle = "Developer", Phone = "07898 654123", Email = "kjames@test.com" },
            new() { FirstName = "Gavin", LastName = "Miles", JobTitle = "UX Design", Phone = "07881 987554", Email = "gmiles@test.com" },
            new() { FirstName = "Kathy", LastName = "Smith", JobTitle = "UX Lead", Phone = "07765 332287", Email = "ksmith@test.com" },
            new() { FirstName = "Phil", LastName = "Walker", JobTitle = "Senior QA", Phone = "07889 984447", Email = "pwalker@test.com" },
            new() { FirstName = "Rebecca", LastName = "Bates", JobTitle = "Product D", Phone = "07798 548733", Email = "rbates@test.com" },
            new() { FirstName = "Hayley", LastName = "Walker-Sm", JobTitle = "Developer", Phone = "07888 932145", Email = "hwalker@test.com" },
            new() { FirstName = "Alexis", LastName = "Crawley", JobTitle = "DevOps Er", Phone = "07778 667412", Email = "acrawley@test.com" },
            new() { FirstName = "David", LastName = "Gold", JobTitle = "DevOps Er", Phone = "07768 479563", Email = "dgold@test.com" },
            new() { FirstName = "Phillipa", LastName = "Walker", JobTitle = "QA Lead", Phone = "07775 357951", Email = "pwalker2@test.com" }
        };

        await db.Users.AddRangeAsync(users, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
    }
}

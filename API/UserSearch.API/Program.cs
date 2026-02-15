using Microsoft.EntityFrameworkCore;
using UserSearch.API;
using UserSearch.API.Endpoints;
using UserSearch.Core.Data;

using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});
builder.Services.AddDbContext<UserDbContext>(options =>
{
    var conn = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=usersearch.db";
    options.UseSqlite(conn);
});
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UserSearch.Core.Queries.SearchUsersQuery.SearchUsersQuery).Assembly));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.UseHttpsRedirection();

app.MapUserEndpoints();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<UserDbContext>();
    db.Database.EnsureCreated();
}

await DataSeeder.SeedIfEmptyAsync(app.Services);

app.Run();

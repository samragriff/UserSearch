using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserSearch.API.Extensions;
using UserSearch.Core.Commands.CreateUserCommand;
using UserSearch.Core.Queries.GetUserQuery;
using UserSearch.Core.Queries.SearchUsersQuery;

namespace UserSearch.API.Endpoints;

internal static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/users");

        group.MapGet("/search", SearchUsersAsync);
        group.MapGet("/{id:int}", GetUserAsync);
        group.MapPost("/", CreateUserAsync);
    }

    private static async Task<IResult> SearchUsersAsync(
        [FromServices] IMediator mediator,
        [FromQuery] string searchText)
    {
        var query = new SearchUsersQuery(searchText ?? string.Empty);
        var result = await mediator.Send(query);
        return TypedResults.Ok(result);
    }

    private static async Task<IResult> GetUserAsync(
        int id,
        [FromServices] IMediator mediator)
    {
        var query = new GetUserQuery(id);
        var result = await mediator.Send(query);
        return result is null ? TypedResults.NotFound() : TypedResults.Ok(result);
    }

    private static async Task<IResult> CreateUserAsync(
        [FromServices] IMediator mediator,
        [FromBody] CreateUserRequest request)
    {
        var command = new CreateUserCommand(
            request.FirstName,
            request.LastName,
            request.JobTitle,
            request.Phone,
            request.Email);
        var result = await mediator.Send(command);
        return result.IsSuccess
            ? TypedResults.Created($"/users/{result.Value}", new { id = result.Value })
            : result.ToApiResult();
    }
}

internal record CreateUserRequest(string FirstName, string LastName, string JobTitle, string Phone, string Email);

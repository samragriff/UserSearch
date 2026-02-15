using Ardalis.Result;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace UserSearch.API.Extensions;

internal static class ResultExtensions
{
    public static IResult ToApiResult<T>(this Result<T> result) =>
        result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();

    private static IResult ToProblemDetails<T>(this Result<T> result)
    {
        if (result.IsSuccess)
            throw new InvalidOperationException("Cannot convert a successful result to a problem detail");

        var (statusCode, title) = result.Status switch
        {
            ResultStatus.Invalid => (StatusCodes.Status400BadRequest, "Bad Request"),
            ResultStatus.Conflict => (StatusCodes.Status409Conflict, "Conflict"),
            _ => (StatusCodes.Status500InternalServerError, "Server Failure")
        };

        return Results.Problem(
            statusCode: statusCode,
            title: title,
            extensions: new Dictionary<string, object?>
            {
                { "validationErrors", result.ValidationErrors },
                { "errors", result.Errors }
            });
    }
}

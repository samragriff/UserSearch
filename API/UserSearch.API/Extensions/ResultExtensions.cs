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

        return Results.Problem(
            statusCode: GetStatusCode(result.Status),
            title: GetTitle(result.Status),
            extensions: new Dictionary<string, object?>
            {
                { "validationErrors", result.ValidationErrors },
                { "errors", result.Errors }
            });
    }

    private static string GetTitle(ResultStatus status) =>
        status switch
        {
            ResultStatus.NotFound => "Not Found",
            ResultStatus.Invalid => "Bad Request",
            ResultStatus.Conflict => "Conflict",
            ResultStatus.Forbidden => "Forbidden",
            ResultStatus.Unauthorized => "Unauthorized",
            _ => "Server Failure"
        };

    private static int GetStatusCode(ResultStatus status) =>
        status switch
        {
            ResultStatus.NotFound => StatusCodes.Status404NotFound,
            ResultStatus.Invalid => StatusCodes.Status400BadRequest,
            ResultStatus.Conflict => StatusCodes.Status409Conflict,
            ResultStatus.Forbidden => StatusCodes.Status403Forbidden,
            ResultStatus.Unauthorized => StatusCodes.Status401Unauthorized,
            _ => StatusCodes.Status500InternalServerError
        };
}

using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace UserSearch.Core;

public static class Dependencies
{
    public static IServiceCollection AddUserSearchCore(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            cfg.AddOpenBehavior(typeof(Behaviours.ValidationBehaviour<,>));
        });

        return services;
    }
}

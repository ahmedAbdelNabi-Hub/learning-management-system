using Application;
using Infrastructure;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Identity;

namespace Presentation.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddWebApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            
            services.AddInfrastructureServices(configuration);
            services.AddApplicationServices(configuration);                 
            services.Configure<DataProtectionTokenProviderOptions>(options => {
                options.TokenLifespan = TimeSpan.FromHours(1);
            });

            return services;
        }
    }
}

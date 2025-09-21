using Application.DTOs.Token;
using Application.Interfaces.ExternalServices;
using Application.Interfaces.InternalServices;
using Domain.Entities.Identity;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UnitOfWork;
using Infrastructure.Contexts;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;             
                options.Password.RequireLowercase = false;         
                options.Password.RequireUppercase = false;         
                options.Password.RequireNonAlphanumeric = false;   
                options.Password.RequiredLength = 6;               
                options.Password.RequiredUniqueChars = 1;
                options.User.RequireUniqueEmail = true; 

            })
            .AddEntityFrameworkStores<AppDbContext>()   
            .AddDefaultTokenProviders();

            services.Configure<TokenConfig>(configuration.GetSection("JwtConfig"));
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, Infrastructure.UnitOfWork.UnitOfWork>();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = configuration["JwtConfig:Issuer"],
                    ValidAudience = configuration["JwtConfig:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtConfig:Key"]!)),
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var jwt = context.Request.Cookies["jwt"];
                        if (!string.IsNullOrEmpty(jwt))
                        {
                            context.Token = jwt;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            return services;
        }
    }
}

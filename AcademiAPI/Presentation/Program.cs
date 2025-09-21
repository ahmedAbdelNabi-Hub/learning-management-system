using Presentation.Filters;
using Presentation.Middlewares;
using Microsoft.AspNetCore.Mvc;
using Presentation.Extensions;
using Infrastructure.SeedData;
using Microsoft.Data.SqlClient;

namespace Presentation
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddWebApiServices(builder.Configuration);
            builder.Services.AddControllers(options =>{options.Filters.Add<ValidateModelAttribute>();});
            builder.Services.Configure<ApiBehaviorOptions>(option => option.SuppressModelStateInvalidFilter = true);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddPresentationServices(builder.Configuration);
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddMemoryCache(); // Register IMemoryCache
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.UseMiddleware<GlobalExceptionHandling>();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors("AllowAngular");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
  
            await app.RunAsync();

        }
    }
}

using Domain.Entities;
using Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.SeedData
{
    public static class StageDivisionSeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();


            // لو مفيش بيانات مسبقة
            if (!context.Stages.Any())
            {
                // إنشاء الصفوف
                var grade1 = new Stage { Name = "الصف الأول الثانوي" };
                var grade2 = new Stage { Name = "الصف الثاني الثانوي" };
                var grade3 = new Stage { Name = "الصف الثالث الثانوي" };

                context.Stages.AddRange(grade1, grade2, grade3);
                await context.SaveChangesAsync();

                var divisions = new[]
                {

                    new Division { Name = "عام", GradeId = grade1.Id },
                    new Division { Name = "أزهر", GradeId = grade1.Id },

                   new Division { Name = "عام", GradeId = grade1.Id },
                   new Division { Name = "أزهر", GradeId = grade1.Id },

                    new Division { Name = "علمي رياضة", GradeId = grade3.Id },
                    new Division { Name = "علمي علوم", GradeId = grade3.Id },
                    new Division { Name = "أدبي", GradeId = grade3.Id },
                    new Division { Name = "أزهر", GradeId = grade3.Id }
                };

                context.Divisions.AddRange(divisions);
                await context.SaveChangesAsync();
            }
        }
    }
}

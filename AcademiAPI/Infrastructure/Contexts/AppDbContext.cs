using Application.DTOs;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Infrastructure.Contexts
{
    public class AppDbContext : IdentityDbContext<AppUser> 
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Governorate> Governorates { get; set; }
        public DbSet<City> Districts { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Division> Divisions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    
    }

}

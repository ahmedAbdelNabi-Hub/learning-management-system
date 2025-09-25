using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Status { get; set; }
        public string ImageUrl { get; set; }
        public AccountType AccountType { get; set; } 
        public string? ParentPhone { get; set; }
        public string? Neighborhood { get; set; }
        public int? GovernorateId { get; set; }
        public Governorate Governorate { get; set; }
        public string? NationalIdImageUrl { get; set; }

        public int? DistrictId { get; set; }
        public District District { get; set; }

        public int? GradeId { get; set; }
        public Grade Grade { get; set; }

        public int? DivisionId { get; set; }
        public Division? Division { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

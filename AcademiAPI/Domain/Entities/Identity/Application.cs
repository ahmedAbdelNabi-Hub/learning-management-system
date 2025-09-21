using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Identity
{
    public class Application : BaseEntity
    {
        public string Type { get; set; }
        public string Status { get; set; } = "Pending"; 
        public string AdminNotes { get; set; }
        public DateTime? ReviewedAt { get; set; }
        public string? VideoUrl { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public string ReviewedById { get; set; }
        public AppUser ReviewedBy { get; set; }
        public ICollection<Document> Documents { get; set; }
    }

}

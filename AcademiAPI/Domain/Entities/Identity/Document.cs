using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Identity
{
    public class Document : BaseEntity
    {
        public string Type { get; set; }
        public string Url { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int? ApplicationId { get; set; }
        public Application Application { get; set; }

    }
}

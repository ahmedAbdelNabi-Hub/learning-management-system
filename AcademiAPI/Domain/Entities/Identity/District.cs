using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Identity
{
    public class District : BaseEntity
    {
        public string Name { get; set; } 
        public int GovernorateId { get; set; }
        public Governorate Governorate { get; set; }
    }

}

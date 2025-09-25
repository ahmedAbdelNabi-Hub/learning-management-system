using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Identity
{
    public class Governorate : BaseEntity
    {
        public string GovernorateNameAr { get; set; }
        public string GovernorateNameEn { get; set; }

        public ICollection<City> Cities { get; set; }
    }
}

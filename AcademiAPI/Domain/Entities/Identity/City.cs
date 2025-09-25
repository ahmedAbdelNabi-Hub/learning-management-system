using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Identity
{
    public class City : BaseEntity
    {
        public string CityNameAr { get; set; }
        public string CityNameEn { get; set; }

        public int GovernorateId { get; set; }
        public Governorate Governorate { get; set; }
    }

}

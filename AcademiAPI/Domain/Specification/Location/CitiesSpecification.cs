using Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Specification.Location
{
    public class CitiesSpecification : BaseSpecifications<City>
    {
        public CitiesSpecification()
        {
            
        }
        public CitiesSpecification(int governorateId)
        {
            AddCriteria(c=>c.GovernorateId == governorateId);
        }
    }
}

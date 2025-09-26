using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Specification.Stages
{
    public class DivisionSpecification : BaseSpecifications<Division>
    {
        public DivisionSpecification()
        {
            
        }
        public DivisionSpecification(int stageId) : base(d=>d.StageId == stageId)
        {
            
        }
    }
}

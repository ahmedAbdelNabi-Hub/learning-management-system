using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Division : BaseEntity
    {
        public string Name { get; set; }

        public int GradeId { get; set; }
        public Stage Stage { get; set; }
    }
}

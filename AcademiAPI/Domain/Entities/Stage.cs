using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Stage : BaseEntity
    {

        public string Name { get; set; } 

        public ICollection<Division>? Divisions { get; set; } = new List<Division>();
    }
}

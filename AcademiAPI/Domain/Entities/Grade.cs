using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Grade
    {
        public int Id { get; set; }

        public string Name { get; set; } // الصف الأول الثانوي, الصف الثاني الثانوي ...

        // علاقة مع الشعب
        public ICollection<Division> Divisions { get; set; } = new List<Division>();
    }
}

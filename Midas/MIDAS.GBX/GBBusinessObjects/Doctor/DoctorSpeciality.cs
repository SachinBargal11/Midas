using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DoctorSpeciality:GbObject
    {
        public Doctor Doctor { get; set; }
        public Specialty Specialty { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class LocationSpeciality : GbObject
    {
        public Location location { get; set; }
        public Specialty Specialty { get; set; }
        public int[] Specialties { get; set; }
    }
}

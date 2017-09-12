using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DoctorSpeciality:GbObject
    {
        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("specialties")]
        public int [] Specialties { get; set; }
    }

    public class mDoctorSpeciality : GbObject
    {
        public mDoctor mDoctor { get; set; }
        public mSpecialty mSpecialty { get; set; }
    }

}

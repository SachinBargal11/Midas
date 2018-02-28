using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class LocationSpeciality : GbObject
    {
        [JsonProperty("location")]
        public Location location { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }

        [JsonProperty("specialties")]
        public int[] Specialties { get; set; }
    }
}

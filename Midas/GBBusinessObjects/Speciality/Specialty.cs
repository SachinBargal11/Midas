using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Midas.GreenBill.BusinessObject
{
    public class Specialty : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("specialityCode")]
        public string SpecialityCode { get; set; }
    }
}

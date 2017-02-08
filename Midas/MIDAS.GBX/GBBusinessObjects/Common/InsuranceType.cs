using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MIDAS.GBX.BusinessObjects.Common
{
    public class InsuranceType : GbObject
    {
        [JsonProperty("insurancetypetext")]
        public string InsuranceTypeText { get; set; }
    }
}

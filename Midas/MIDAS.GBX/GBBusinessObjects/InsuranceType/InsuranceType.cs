using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class InsuranceType : GbObject
    {
        [JsonProperty("insuranceTypeText")]
        public string InsuranceTypeText { get; set; }     
    }

   
}

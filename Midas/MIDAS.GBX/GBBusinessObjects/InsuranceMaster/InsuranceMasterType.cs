using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class InsuranceMasterType : GbObject
    {
        [JsonProperty("insuranceMasterTypeText")]
        public string InsuranceMasterTypeText { get; set; }
        
    }

    public class mInsuranceMasterType : GbObject
    {
        [JsonProperty("insuranceMasterTypeText")]
        public string InsuranceMasterTypeText { get; set; }
       
    }
}

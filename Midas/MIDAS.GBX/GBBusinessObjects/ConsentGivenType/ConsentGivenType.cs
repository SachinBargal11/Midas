using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class ConsentGivenType : GbObject
    {       
        [JsonProperty("typeText")]
        public string TypeText { get; set; }

        [JsonProperty("typeDescription")]
        public string TypeDescription { get; set; }

    }

    public class mConsentGivenType : GbObject
    {
        [JsonProperty("typeText")]
        public string TypeText { get; set; }

        [JsonProperty("typeDescription")]
        public string TypeDescription { get; set; }

    }

}
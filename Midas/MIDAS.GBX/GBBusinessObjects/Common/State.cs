using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.Common
{
    public class State : GbObject
    {
        //[JsonProperty("id")]
        //public int Id { get; set; }

        [JsonProperty("statecode")]
        public string StateCode { get; set; }

        [JsonProperty("statetext")]
        public string StateText { get; set; }
    }
}

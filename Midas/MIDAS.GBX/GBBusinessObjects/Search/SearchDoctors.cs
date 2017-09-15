using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class SearchDoctors : GbObject
    {
        [JsonProperty("doYouNeedTransportion")]
        public bool DoYouNeedTransportion { get; set; }

        [JsonProperty("genderId")]
        public byte? GenderId { get; set; }

        [JsonProperty("handicapRamp")]
        public bool HandicapRamp { get; set; }

        [JsonProperty("stairsToOffice")]
        public bool StairsToOffice { get; set; }

        [JsonProperty("publicTransportNearOffice")]
        public bool PublicTransportNearOffice { get; set; }

        [JsonProperty("multipleDoctors")]
        public bool MultipleDoctors { get; set; }
    }
}

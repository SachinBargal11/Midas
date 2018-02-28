using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class SchoolInformation : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("nameOfSchool")]
        public string NameOfSchool { get; set; }

        [JsonProperty("grade")]
        public string Grade { get; set; }

        [JsonProperty("lossOfTime")]
        public bool? LossOfTime { get; set; }

        [JsonProperty("datesOutOfSchool")]
        public string DatesOutOfSchool { get; set; }
    }
}

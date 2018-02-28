using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientPriorAccidentInjury : GbObject
    {
        [JsonProperty("caseId")]
        public int CaseId { get; set; }

        [JsonProperty("accidentBefore")]
        public bool? AccidentBefore { get; set; }

        [JsonProperty("accidentBeforeExplain")]
        public string AccidentBeforeExplain { get; set; }

        [JsonProperty("lawsuitWorkerCompBefore")]
        public bool? LawsuitWorkerCompBefore { get; set; }

        [JsonProperty("lawsuitWorkerCompBeforeExplain")]
        public string LawsuitWorkerCompBeforeExplain { get; set; }

        [JsonProperty("physicalComplaintsBefore")]
        public bool? PhysicalComplaintsBefore { get; set; }

        [JsonProperty("physicalComplaintsBeforeExplain")]
        public string PhysicalComplaintsBeforeExplain { get; set; }

        [JsonProperty("otherInformation")]
        public string OtherInformation { get; set; }
    }
}

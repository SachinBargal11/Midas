using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class DoctorCaseConsentApproval : GbObject
    {
        [JsonProperty("doctorId")]
        public int DoctorId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientid")]
        public int? Patientid { get; set; }

        [JsonProperty("fileName")]
        public string FileName { get; set; }

        [JsonProperty("consentReceived")]
        public string ConsentReceived { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }

    }

}
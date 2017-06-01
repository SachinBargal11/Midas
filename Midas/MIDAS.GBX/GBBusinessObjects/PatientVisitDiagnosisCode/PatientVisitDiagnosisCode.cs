using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientVisitDiagnosisCode : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("diagnosisCodeId")]
        public int DiagnosisCodeId { get; set; }

        [JsonProperty("diagnosisCode")]
        public DiagnosisCode DiagnosisCode { get; set; }

        [JsonProperty("patientVisit2")]
        public PatientVisit2 PatientVisit2 { get; set; }

    }

    public class mPatientVisitDiagnosisCode : GbObject
    {
        [JsonProperty("patientVisitId")]
        public int PatientVisitId { get; set; }

        [JsonProperty("diagnosisCodeId")]
        public int DiagnosisCodeId { get; set; }

        [JsonProperty("mDiagnosisCode")]
        public mDiagnosisCode mDiagnosisCode { get; set; }

        //[JsonProperty("mPatientVisit")]
        //public mPatientVisit mPatientVisit { get; set; }

    }
}


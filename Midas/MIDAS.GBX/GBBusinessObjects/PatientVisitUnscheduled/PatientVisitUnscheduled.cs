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
    public class PatientVisitUnscheduled : GbObject
    {
        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("medicalProviderName")]
        public string MedicalProviderName { get; set; }

        [JsonProperty("doctorName")]
        public string DoctorName { get; set; }

        [JsonProperty("locationName")]
        public string LocationName { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("roomTestId")]
        public int? RoomTestId { get; set; }

        [JsonProperty("referralId")]
        public int? ReferralId { get; set; }

        [JsonProperty("orignatorCompanyId")]
        public int OrignatorCompanyId { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("patient")]
        public Patient Patient { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("roomTest")]
        public RoomTest RoomTest { get; set; }

        [JsonProperty("specialty")]
        public Specialty Specialty { get; set; }
    }

    public class ReferralVisitUnscheduled : GbObject
    {
        [JsonProperty("pendingReferralId")]
        public int PendingReferralId { get; set; }

        [JsonProperty("patientVisitUnscheduled")]
        public PatientVisitUnscheduled PatientVisitUnscheduled { get; set; }
    }
}

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
    public class IMEVisit : GbObject
    {
        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("visitStatusId")]
        public int? VisitStatusId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("transportProviderId")]
        public int? TransportProviderId { get; set; }

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

        [JsonProperty("patient")]
        public Patient Patient { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("transportProvider")]
        public Company Company { get; set; }

        [JsonProperty("doctorName")]
        public string DoctorName { get; set; }

        [JsonProperty("visitCreatedByCompanyId")]
        public int? VisitCreatedByCompanyId { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MIDAS.GBX.BusinessObjects
{
    public class AttorneyVisit : GbObject
    {
        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("subject")]
        public string Subject { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("contactPerson")]
        public string ContactPerson { get; set; }

        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [JsonProperty("notes")]
        public string Agenda { get; set; }

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

        [JsonProperty("patient")]
        public Patient Patient { get; set; }

        [JsonProperty("case")]
        public Case Case { get; set; }

        [JsonProperty("company")]
        public Company Company { get; set; }

        [JsonProperty("location")]
        public Location Location { get; set; }
    }

    public class AttorneyVisitDashboard : GbObject
    {
        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("attorneyId")]
        public int? AttorneyId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("subject")]
        public string Subject { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("contactPerson")]
        public string ContactPerson { get; set; }

        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }

        [JsonProperty("notes")]
        public string Agenda { get; set; }

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

        [JsonProperty("patientName")]
        public string PatientName { get; set; }        
    }
}
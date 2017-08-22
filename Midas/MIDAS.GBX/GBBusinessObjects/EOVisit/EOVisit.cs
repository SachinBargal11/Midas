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
    public class EOVisit : GbObject
    {
        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("visitCreatedByCompanyId")]
        public int? VisitCreatedByCompanyId { get; set; }

        [JsonProperty("insuranceProviderId")]
        public int? InsuranceProviderId { get; set; }

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

        [JsonProperty("calendarEvent")]
        public CalendarEvent CalendarEvent { get; set; }

        [JsonProperty("doctor")]
        public Doctor Doctor { get; set; }        

        [JsonProperty("medicalProvider")]
        public Company Company { get; set; }

        [JsonProperty("insuranceMaster")]
        public InsuranceMaster InsuranceMaster { get; set; }

    }
}

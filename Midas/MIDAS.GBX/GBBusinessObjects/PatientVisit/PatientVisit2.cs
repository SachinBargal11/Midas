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
    public class PatientVisit2 : GbObject
    {
        [JsonProperty("calendarEventId")]
        public int? CalendarEventId { get; set; }

        [JsonProperty("caseId")]
        public int? CaseId { get; set; }

        [JsonProperty("patientId")]
        public int? PatientId { get; set; }

        [JsonProperty("locationId")]
        public int? LocationId { get; set; }

        [JsonProperty("roomId")]
        public int? RoomId { get; set; }

        [JsonProperty("doctorId")]
        public int? DoctorId { get; set; }

        [JsonProperty("specialtyId")]
        public int? SpecialtyId { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("notes")]
        public string Notes { get; set; }

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("visitType")]
        public byte? VisitType { get; set; }

        public CalendarEvent CalendarEvent { get; set; }
    }
}

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects.CalendarEvent
{
    public class CalendarEvent : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("timeZone")]
        public string TimeZone { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("recurrenceId")]
        public int? RecurrenceId { get; set; }

        [JsonProperty("recurrenceRule")]
        public string RecurrenceRule { get; set; }

        [JsonProperty("recurrenceException")]
        public string RecurrenceException { get; set; }

        [JsonProperty("isAllDay")]
        [JsonConverter(typeof(BoolConverter))]
        public bool? IsAllDay { get; set; }
    }

    //---------------------------------------------------------

    public class CalendarEventWithPatientVisit2 : GbObject
    {
        //PatientVisit2 Data
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

        [JsonProperty("visitStatusId")]
        public byte? VisitStatusId { get; set; }

        [JsonProperty("visitType")]
        public byte? VisitType { get; set; }


        //CalendarEvent Data
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("timeZone")]
        public string TimeZone { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("recurrenceId")]
        public int? RecurrenceId { get; set; }

        [JsonProperty("recurrenceRule")]
        public string RecurrenceRule { get; set; }

        [JsonProperty("recurrenceException")]
        public string RecurrenceException { get; set; }

        [JsonProperty("isAllDay")]
        [JsonConverter(typeof(BoolConverter))]
        public bool? IsAllDay { get; set; }
    }
}

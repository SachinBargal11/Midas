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

        [JsonProperty("isCancelled")]
        public bool? IsCancelled { get; set; }

    }

    public class mCalendarEvent : GbObject
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("eventStart")]
        public DateTime? EventStart { get; set; }

        [JsonProperty("eventEnd")]
        public DateTime? EventEnd { get; set; }

        [JsonProperty("timeZone")]
        public string TimeZone { get; set; }

        [JsonProperty("isAllDay")]
        [JsonConverter(typeof(BoolConverter))]
        public bool? IsAllDay { get; set; }

    }

    public class FreeSlots : GbObject
    {
        [JsonProperty("forDate")]
        public DateTime ForDate { get; set; }

        [JsonProperty("startAndEndTimes")]
        public List<StartAndEndTime> StartAndEndTimes { get; set; }
    }

    public class StartAndEndTime
    {
        [JsonProperty("startTime")]
        public DateTime StartTime { get; set; }

        [JsonProperty("endTime")]
        public DateTime EndTime { get; set; }
    }

    public class StartAndEndTimeSlots
    {
        [JsonProperty("startTime")]
        public TimeSpan StartTime { get; set; }

        [JsonProperty("endTime")]
        public TimeSpan EndTime { get; set; }
    }
}

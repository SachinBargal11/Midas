using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MIDAS.GBX.BusinessObjects
{
    public class PatientPersonalSetting : GbObject
    {
        [JsonProperty("patientId")]
        public int PatientId { get; set; }        

        [JsonProperty("preferredModeOfCommunication")]
        public int PreferredModeOfCommunication { get; set; }

        [JsonProperty("isPushNotificationEnabled")]
        public bool IsPushNotificationEnabled { get; set; }

        [JsonProperty("calendarViewId")]
        public byte CalendarViewId { get; set; }

        [JsonProperty("patient")]
        public Patient Patient { get; set; }
    }
}

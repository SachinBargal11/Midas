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
    public class UserPersonalSetting : GbObject
    {        
        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("companyId")]
        public int CompanyId { get; set; }

        [JsonProperty("isPublic")]
        public bool IsPublic { get; set; }

        [JsonProperty("isSearchable")]
        public bool IsSearchable { get; set; }

        [JsonProperty("isCalendarPublic")]
        public bool IsCalendarPublic { get; set; }

        [JsonProperty("slotDuration")]
        public int SlotDuration { get; set; }

        [JsonProperty("preferredModeOfCommunication")]
        public int PreferredModeOfCommunication { get; set; }

        [JsonProperty("isPushNotificationEnabled")]
        public bool IsPushNotificationEnabled { get; set; }

        [JsonProperty("calendarViewId")]
        public byte CalendarViewId { get; set; }

        [JsonProperty("preferredUIViewId")]
        public byte PreferredUIViewId { get; set; }

        [JsonProperty("user")]
        public User User { get; set; }
    }

}


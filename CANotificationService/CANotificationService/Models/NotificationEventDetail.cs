using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationEventDetail
    {
        public int EventID { get; set; }
        public string EventName { get; set; }
        public int ApplicationID { get; set; }
        public string ApplicationName { get; set; }
    }
}
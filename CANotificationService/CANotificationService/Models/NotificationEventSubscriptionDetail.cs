using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationEventSubscriptionDetail
    {
        public int SubscriptionID { get; set; }
        public string UserID { get; set; }
        public int EventID { get; set; }
        public string EventName { get; set; }
        public int ApplicationID { get; set; }
        public string AppliicationName { get; set; }
    }
}
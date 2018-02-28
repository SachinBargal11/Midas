using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationEventSubscription
    {
        public int SubscriptionID { get; set; }
        public string UserID { get; set; }
        public int EventID { get; set; }
    }
}
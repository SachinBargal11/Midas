using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class UserEventSubscription
    {
        public string ApplicationName { get; set; }
        public string UserName { get; set; }
        public int [] EventIDs { get; set; }
    }
}
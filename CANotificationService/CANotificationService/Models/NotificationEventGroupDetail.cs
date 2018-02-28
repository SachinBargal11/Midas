using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationEventGroupDetail
    {
        public int EventGroupID { get; set; }
        public int EventID { get; set; }
        public string EventName { get; set; }
        public int GroupID { get; set; }
        public string GroupName { get; set; }
    }
}
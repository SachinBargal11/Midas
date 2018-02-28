using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationUser
    {
        public string UserName { get; set; }
        public int ApplicationID { get; set; }
        public string ApplicationName { get; set; }
    }
}
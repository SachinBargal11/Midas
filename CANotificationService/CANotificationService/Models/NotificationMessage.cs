using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationMessage
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string ReceiverUserID { get; set; }
        public DateTime NotificationTime { get; set; }
        public bool IsRead { get; set; }
        public int EventID { get; set; }
        public string EventName { get; set; }
        public string ApplicationName { get; set; }
        public int ApplicationID { get; set; }
    }
}
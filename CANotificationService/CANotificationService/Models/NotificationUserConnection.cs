using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationUserConnection
    {
        public string ConnectionId { get; set; }
        public string UserAgent { get; set; }
        public bool IsConnected { get; set; }
        public string UserName { get; set; }
    }
}
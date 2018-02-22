using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessagingServiceManager.Entities
{
    public class SMSConfiguration
    {
        public int Id { get; set; }
        public int ApplicationID { get; set; }
        public string AccountSid { get; set; }
        public string AuthToken { get; set; }
        public int MaxNumberOfRetry { get; set; }
        public string SMSFromPhoneNumber { get; set; }
    }
}
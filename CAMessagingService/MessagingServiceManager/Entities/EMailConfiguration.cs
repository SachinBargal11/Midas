using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessagingServiceManager.Entities
{
    public class EMailConfiguration
    {
        public int Id { get; set; }
        public int ApplicationID { get; set; }
        public string SMTPClientHostName { get; set; }
        public int SmtpClientPortNumber { get; set; }
        public string SMTPClientUserName { get; set; }
        public string SMTPClientPassword { get; set; }
        public bool IsDeleted { get; set; }
        public int MaxNumberOfRetry { get; set; }
        public bool IsSSLEnabled { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagingServiceManager.Entities
{
    public class EmailMessage
    {
        public string ApplicationName { get; set; }
        public string FromEmail { get; set; }
        public string ToEmail { get; set; }
        public string CcEmail { get; set; }
        public string BccEmail { get; set; }
        public string EMailSubject { get; set; }
        public string EMailBody { get; set; }
    }
}

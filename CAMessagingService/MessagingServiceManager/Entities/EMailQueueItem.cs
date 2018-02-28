using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessagingServiceManager.Entities
{
    public class EMailQueueItem
    {
        public int Id { get; set; }
        public int ApplicationID { get; set; }
        public int StatusID { get; set; }
        public byte[] EmailObject { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public int NumberOfAttempts { get; set; }
        public string DeliveryResponse { get; set; }
        public string ApplicationName { get; set; }
        public string FromEmail { get; set; }
        public string ToEmail { get; set; }
        public string CcEmail { get; set; }
        public string BccEmail { get; set; }
        public string EMailSubject { get; set; }
        public string EMailBody { get; set; }
    }
}
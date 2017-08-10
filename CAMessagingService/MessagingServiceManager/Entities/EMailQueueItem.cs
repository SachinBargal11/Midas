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
    }
}
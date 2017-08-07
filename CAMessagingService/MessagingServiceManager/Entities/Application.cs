using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessagingServiceManager.Entities
{
    public class Application
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int QueueTypeID { get; set; }
    }
}
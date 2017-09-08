using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Subscription
    {
        public int SubscriptionID { get; set; }
        public string UserID { get; set; }
        public int EventID { get; set; }
        public string EventName { get; set; }
        public int ApplicationID { get; set; }
        public string AppliicationName { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagingServiceManager.Entities
{
    public class SMS
    {
        public string ApplicationName { get; set; }
        public string ToNumber { get; set; }
        public string FromNumber { get; set; }
        public string Message { get; set; }
    }
}

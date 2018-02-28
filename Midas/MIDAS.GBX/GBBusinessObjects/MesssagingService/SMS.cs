using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    [Serializable]
    [JsonObject]
    public class SMS
    {
        public string ApplicationName { get; set; }
        public string ToNumber { get; set; }
        public string FromNumber { get; set; }
        public string Message { get; set; }
    }
}

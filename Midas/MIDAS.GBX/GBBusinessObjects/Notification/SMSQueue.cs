using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class SMSQueue : GbObject
    {
        [JsonProperty("appId")]
        public int AppId { get; set; }

        [JsonProperty("fromNumber")]
        public string FromNumber { get; set; }

        [JsonProperty("toNumber")]
        public string ToNumber { get; set; }        

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty("deliveryDate")]
        public DateTime? DeliveryDate { get; set; }

        [JsonProperty("numberOfAttempts")]
        public int NumberOfAttempts { get; set; }

        [JsonProperty("resultObject")]
        public string ResultObject { get; set; }
    }
}

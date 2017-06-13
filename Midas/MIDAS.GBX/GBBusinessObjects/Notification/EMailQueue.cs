using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MIDAS.GBX.BusinessObjects
{
    public class EMailQueue : GbObject
    {
        [JsonProperty("appId")]
        public int AppId { get; set; }

        [JsonProperty("fromEmail")]
        public string FromEmail { get; set; }

        [JsonProperty("toEmail")]
        public string ToEmail { get; set; }

        [JsonProperty("ccEmail")]
        public string CcEmail { get; set; }

        [JsonProperty("bccEmail")]
        public string BccEmail { get; set; }

        [JsonProperty("eMailSubject")]
        public string EMailSubject { get; set; }

        [JsonProperty("eMailBody")]
        public string EMailBody { get; set; }

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

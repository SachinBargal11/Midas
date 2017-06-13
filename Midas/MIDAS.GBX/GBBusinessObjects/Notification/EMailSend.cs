using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MIDAS.GBX.BusinessObjects
{
    public class EMailSend : GbObject
    {
        [JsonProperty("appId")]
        public int AppId { get; set; }

        [JsonProperty("smtpClient")]
        public string SmtpClient { get; set; }

        [JsonProperty("smtpClient_Port")]
        public string SmtpClient_Port { get; set; }

        [JsonProperty("networkCredential_EMail")]
        public string NetworkCredential_EMail { get; set; }

        [JsonProperty("networkCredential_Pwd")]
        public string NetworkCredential_Pwd { get; set; }

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

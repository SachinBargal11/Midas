using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class SMS
    {
        public string twilio_account_id { get; set; }
        public string twilio_auth_token { get; set; }

        public string FromNumber { get; set; }
        public string ToNumber { get; set; }
        public string Message { get; set; }

        public MessageResource MessageResource { get; set; }
    }

    public class MultipleSMS
    {
        public string twilio_account_id { get; set; }
        public string twilio_auth_token { get; set; }

        public string FromNumber { get; set; }
        
        public List<SMSList> SMSList { get; set; }
    }

    public class SMSList
    {
        public string ToNumber { get; set; }
        public string Message { get; set; }

        public MessageResource MessageResource { get; set; }
    }

    public class MessageResource
    {
        public string AccountSid { get; set; }
        public string ApiVersion { get; set; }
        public string Body { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateSent { get; set; }
        public DateTime? DateUpdated { get; set; }
        public DirectionEnum Direction { get; set; }
        public int? ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string From { get; set; }
        public string MessagingServiceSid { get; set; }
        public string NumMedia { get; set; }
        public string NumSegments { get; set; }
        public decimal? Price { get; set; }
        public string PriceUnit { get; set; }
        public string Sid { get; set; }
        public StatusEnum Status { get; set; }
        public Dictionary<string, string> SubresourceUris { get; set; }
        public string To { get; set; }
        public string Uri { get; set; }
    }

    public sealed class DirectionEnum
    {
        public static readonly DirectionEnum Inbound;
        public static readonly DirectionEnum OutboundApi;
        public static readonly DirectionEnum OutboundCall;
        public static readonly DirectionEnum OutboundReply;
    }

    public sealed class StatusEnum
    {
        public static readonly StatusEnum Delivered;
        public static readonly StatusEnum Failed;
        public static readonly StatusEnum Queued;
        public static readonly StatusEnum Received;
        public static readonly StatusEnum Receiving;
        public static readonly StatusEnum Sending;
        public static readonly StatusEnum Sent;
        public static readonly StatusEnum Undelivered;
    }
}

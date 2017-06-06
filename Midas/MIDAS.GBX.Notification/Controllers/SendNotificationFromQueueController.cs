using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.Notification.RequestHandler;

namespace MIDAS.GBX.Notification.Controllers
{
    [RoutePrefix("midasNotificationAPI/SendNotificationFromQueue")]
    public class SendNotificationFromQueueController : ApiController
    {
        private IRequestHandler<SMSNotification> requestHandlerSMS;

        public SendNotificationFromQueueController()
        {
            requestHandlerSMS = new NotificationRequestHandler<SMSNotification>();
        }

        [HttpPost]
        [Route("sendSMS")]
        public HttpResponseMessage SendSMS([FromBody]SMSNotification smsObject)
        {
            return requestHandlerSMS.SendSMSFromQueue(Request, smsObject);
        }
    }
}

using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.Notification.RequestHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.Notification.Controllers
{
    [RoutePrefix("midasNotificationAPI/SMSQueue")]
    public class SMSQueueController : ApiController
    {
        private IRequestHandler<SMSQueue> requestHandlerSMS;

        public SMSQueueController()
        {
            requestHandlerSMS = new NotificationRequestHandler<SMSQueue>();
        }

        [HttpPost]
        [Route("addToQueue")]
        public HttpResponseMessage AddToQueue([FromBody]SMSQueue smsObject)
        {
            return requestHandlerSMS.AddToQueue(Request, smsObject);
        }

        [HttpGet]
        [Route("readFromQueue")]
        public HttpResponseMessage ReadFromQueue()
        {
            return requestHandlerSMS.ReadFromQueue(Request);
        }
    }
}

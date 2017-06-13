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
    [RoutePrefix("midasNotificationAPI/SendSMSFromQueue")]
    public class SendSMSFromQueueController : ApiController
    {
        private IRequestHandler<SMSSend> requestHandlerSMS;

        public SendSMSFromQueueController()
        {
            requestHandlerSMS = new NotificationRequestHandler<SMSSend>();
        }

        [HttpPost]
        [Route("sendSMS")]
        public HttpResponseMessage SendSMS([FromBody]SMSSend smsObject)
        {
            return requestHandlerSMS.SendSMSFromQueue(Request, smsObject);
        }

        [HttpPost]
        [Route("SendSMSList")]
        public HttpResponseMessage SendSMSList([FromBody]List<SMSSend> smsObject)
        {
            return requestHandlerSMS.SendSMSListFromQueue(Request, smsObject);
        }        
    }
}

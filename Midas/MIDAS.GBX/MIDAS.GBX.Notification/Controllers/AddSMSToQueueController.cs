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
    [RoutePrefix("midasNotificationAPI/AddSMSToQueue")]
    public class AddSMSToQueueController : ApiController
    {
        private IRequestHandler<SMSQueue> requestHandlerSMS;

        public AddSMSToQueueController()
        {
            requestHandlerSMS = new NotificationRequestHandler<SMSQueue>();
        }

        [HttpPost]
        [Route("addSMS")]
        public HttpResponseMessage AddSMS([FromBody]SMSQueue smsObject)
        {
            return requestHandlerSMS.AddSMSToQueue(Request, smsObject);
        }
    }
}

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
    [RoutePrefix("midasNotificationAPI/SendEMailFromQueue")]
    public class SendEMailFromQueueController : ApiController
    {
        private IRequestHandler<EMailSend> requestHandlerSMS;

        public SendEMailFromQueueController()
        {
            requestHandlerSMS = new NotificationRequestHandler<EMailSend>();
        }

        [HttpPost]
        [Route("SendEMailList")]
        public HttpResponseMessage SendSMSList([FromBody]List<EMailSend> eMailObject)
        {
            return requestHandlerSMS.SendListFromQueue(Request, eMailObject);
        }
    }
}

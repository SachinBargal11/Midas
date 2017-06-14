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
    [RoutePrefix("midasNotificationAPI/SendEMail")]
    public class SendEMailController : ApiController
    {
        private IRequestHandler<EMailSend> requestHandlerSMS;

        public SendEMailController()
        {
            requestHandlerSMS = new NotificationRequestHandler<EMailSend>();
        }

        [HttpPost]
        [Route("sendEMailList")]
        public HttpResponseMessage SendSMSList([FromBody]List<EMailSend> eMailObject)
        {
            return requestHandlerSMS.SendListFromQueue(Request, eMailObject);
        }
    }
}

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
    [RoutePrefix("midasNotificationAPI/SendNotification")]
    public class SendNotificationController : ApiController
    {
        private IRequestHandler<SMS> requestHandlerSMS;

        public SendNotificationController()
        {
            requestHandlerSMS = new NotificationRequestHandler<SMS>();
        }

        [HttpPost]
        [Route("sendSMS")]
        public HttpResponseMessage SendSMS([FromBody]SMS smsObject)
        {
            return requestHandlerSMS.SendSMS(Request, smsObject);
        }
    }
}

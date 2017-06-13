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
    [RoutePrefix("midasNotificationAPI/EMailQueueReadWrite")]
    public class EMailQueueReadWriteController : ApiController
    {
        private IRequestHandler<EMailQueue> requestHandlerSMS;

        public EMailQueueReadWriteController()
        {
            requestHandlerSMS = new SMSRequestHandler<EMailQueue>();
        }

        [HttpPost]
        [Route("addToQueue")]
        public HttpResponseMessage AddToQueue([FromBody]EMailQueue emailObject)
        {
            return requestHandlerSMS.AddToQueue(Request, emailObject);
        }
    }
}

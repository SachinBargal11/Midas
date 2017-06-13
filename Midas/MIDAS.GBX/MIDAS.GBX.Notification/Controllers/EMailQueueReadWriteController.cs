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
        //private IRequestHandler<SMSQueue> requestHandlerSMS;

        public EMailQueueReadWriteController()
        {
            //requestHandlerSMS = new SMSRequestHandler<SMSQueue>();
        }
    }
}

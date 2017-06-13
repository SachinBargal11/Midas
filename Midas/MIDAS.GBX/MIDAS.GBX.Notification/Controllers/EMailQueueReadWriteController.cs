﻿using MIDAS.GBX.BusinessObjects;
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
        private IRequestHandler<EMailQueue> requestHandlerEMail;

        public EMailQueueReadWriteController()
        {
            requestHandlerEMail = new NotificationRequestHandler<EMailQueue>();
        }

        [HttpPost]
        [Route("addToQueue")]
        public HttpResponseMessage AddToQueue([FromBody]EMailQueue emailObject)
        {
            return requestHandlerEMail.AddToQueue(Request, emailObject);
        }

        [HttpGet]
        [Route("readFromQueue")]
        public HttpResponseMessage ReadFromQueue()
        {
            return requestHandlerEMail.ReadFromQueue(Request);
        }
    }
}

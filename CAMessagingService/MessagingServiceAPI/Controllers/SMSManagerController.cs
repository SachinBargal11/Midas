using MessagingServiceManager.Business;
using MessagingServiceManager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MessagingServiceAPI.Controllers
{
    [RoutePrefix("SMS")]
    public class SMSManagerController : ApiController
    {
        private IMessageManager<SMS, SMSQueueItem> smsmanager;

        public SMSManagerController()
        {
            smsmanager = new SMSManager();
        }

        [Route("AddMessageToQueue")]
        [HttpPost]
        public HttpResponseMessage AddMessageToQueue([FromBody]SMS messageitem)
        {
            smsmanager.AddMessageToQueue(messageitem);
            return Request.CreateResponse(HttpStatusCode.OK, "Message added to queue successfully");
        }

        [Route("SendMessage")]
        [HttpPost]
        public HttpResponseMessage SendMessage([FromBody]SMSQueueItem smsqueueitem)
        {
            return Request.CreateResponse(HttpStatusCode.OK, smsmanager.SendMessage(smsqueueitem));
        }

        [Route("SendMessageInstantly")]
        [HttpPost]
        public HttpResponseMessage SendMessageInstantly([FromBody]SMS messageitem)
        {
            return Request.CreateResponse(HttpStatusCode.OK, smsmanager.SendMessageInstantly(messageitem));
        }

        [Route("GetPendingMessages")]
        [HttpGet]
        public HttpResponseMessage GetPendingMessages()
        {
            return Request.CreateResponse(HttpStatusCode.OK, smsmanager.GetPendingMessages());
        }
    }
}

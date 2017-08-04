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
    [RoutePrefix("EMail")]
    public class EmailManagerController : ApiController
    {
        private IMessageManager<EmailMessage, EMailQueueItem> emailmanager;

        public EmailManagerController()
        {
            emailmanager = new EMailManager();
        }

        [Route("AddMessageToQueue")]
        [HttpPost]
        public HttpResponseMessage AddMessageToQueue([FromBody]EmailMessage messageitem)
        {
            emailmanager.AddMessageToQueue(messageitem);
            return Request.CreateResponse(HttpStatusCode.OK, "Message added to queue successfully");
        }

        [Route("SendMessage")]
        [HttpPost]
        public HttpResponseMessage SendMessage([FromBody]EMailQueueItem emailqueueitem)
        {
            return Request.CreateResponse(HttpStatusCode.OK, emailmanager.SendMessage(emailqueueitem));
        }

        [Route("SendMessageInstantly")]
        [HttpPost]
        public HttpResponseMessage SendMessageInstantly([FromBody]EmailMessage messageitem)
        {
            return Request.CreateResponse(HttpStatusCode.OK, emailmanager.SendMessageInstantly(messageitem));
        }

        [Route("GetPendingMessages")]
        [HttpGet]
        public HttpResponseMessage GetPendingMessages()
        {
            return Request.CreateResponse(HttpStatusCode.OK, emailmanager.GetPendingMessages());
        }
    }
}

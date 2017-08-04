using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CANotificationService.Repository;
using CANotificationService.Models;

namespace CANotificationService.Controllers
{
    //[Authorize]
    [RoutePrefix("NotificationManager")]
    public class NotificationManagerController : ApiController
    {
        [Route("PushMessage")]
        [HttpPost]
        public HttpResponseMessage PushMessage(string receiverusername, string notificationmessage, int eventid)
        {
            string message = string.Empty;

            NotificationRepository repository = new NotificationRepository();
            try
            {
                repository.AddMessage(receiverusername, notificationmessage, eventid);
                return Request.CreateResponse(HttpStatusCode.OK, "Message successfully pushed to notification service");
            }
            catch (Exception ex)
            {
                message = "Unable to push message to notification service due error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("SubscribeEvent")]
        [HttpPost]
        public HttpResponseMessage SubscribeEvent(string applicationname, string username, int eventid)
        {
            string message = string.Empty;

            NotificationRepository repository = new NotificationRepository();
            try
            {
                repository.SubscribeEvent(applicationname, username, eventid);
                return Request.CreateResponse(HttpStatusCode.OK, "Notification subscription successfully saved");
            }
            catch (Exception ex)
            {
                message = "Unable subscribe notification event due error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("SubscribeEvents")]
        [HttpPost]
        public HttpResponseMessage SubscribeEvents([FromBody]UserEventSubscription subscription)
        {
            string message = string.Empty;

            NotificationRepository repository = new NotificationRepository();
            try
            {
                repository.SubscribeEvent(subscription.ApplicationName, subscription.UserName, subscription.EventIDs);
                message = "Event(s) subscription saved successfully";
                return Request.CreateResponse(HttpStatusCode.OK, "Notification subscription saved successfully");
            }
            catch (Exception ex)
            {
                message = "Unable subscribe notification events due error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("GetSubscriptions")]
        [HttpGet]
        public HttpResponseMessage GetSubscriptions(string applicationname, string username)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();

                var subscriptions = repository.GetSubscription(applicationname, username);
                return Request.CreateResponse(HttpStatusCode.OK, subscriptions);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve subscription details due to erro: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("GetSubscription")]
        [HttpGet]
        public HttpResponseMessage GetSubscription(string applicationname, string username, int eventid)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();

                var subscription = repository.GetSubscription(applicationname, username, eventid);
                return Request.CreateResponse(HttpStatusCode.OK, subscription);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve subscription details due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("GetApplicationGroup")]
        [HttpGet]
        public HttpResponseMessage GetApplicationGroup(string applicationName, string groupname)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();
                var applicationgroup = repository.GetApplicationGroup(applicationName, groupname);
                return Request.CreateResponse(HttpStatusCode.OK, applicationgroup);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve application group details due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("GetGroupEventsByGroupID")]
        [HttpGet]
        public HttpResponseMessage GetGroupEventsByGroupID(int groupid)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();
                var eventgroups = repository.GetGroupEvent(groupid);
                return Request.CreateResponse(HttpStatusCode.OK, eventgroups);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve group event details due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

       
        [Route("GetGroupEvents")]
        [HttpGet]
        public HttpResponseMessage GetGroupEvents(string applicationName, string groupname)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();
                var eventgroups = repository.GetGroupEvent(applicationName, groupname);
                return Request.CreateResponse(HttpStatusCode.OK, eventgroups);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve group event details due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("GetMessages")]
        [HttpGet]
        public HttpResponseMessage GetMessages(string applicationname, string username)
        {
            try
            { 
            NotificationRepository repository = new NotificationRepository();
            var messases = repository.GetNotificationMessages(applicationname, username);
            return Request.CreateResponse(HttpStatusCode.OK, messases);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve messages due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("GetApplicationEvents")]
        [HttpGet]
        public HttpResponseMessage GetApplicationEvents(string applicationName)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();
                var events = repository.GetApplicationEvent(applicationName);
                return Request.CreateResponse(HttpStatusCode.OK, events);
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve application notification events due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }

        }

        [Route("HasSubscriptionByEventID")]
        [HttpGet]
        public HttpResponseMessage HasEventSubscription(string receiverusername, int eventid)
        {
            try
            { 
            NotificationRepository repository = new NotificationRepository();
            return Request.CreateResponse(HttpStatusCode.OK, repository.HasEventSubscription(receiverusername, eventid));
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve event subscription information due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
        }

        [Route("HasSubscriptionByEventName")]
        [HttpGet]
        public HttpResponseMessage HasEventSubscription(string applicationname, string receiverusername, string eventname)
        {
            try
            {
                NotificationRepository repository = new NotificationRepository();
                return Request.CreateResponse(HttpStatusCode.OK, repository.HasEventSubscription(applicationname, receiverusername, eventname));
            }
            catch (Exception ex)
            {
                var message = "Unable retrieve event subscription information due to error: " + ex.Message;
                return Request.CreateResponse(HttpStatusCode.InternalServerError, message);
            }
}
    }
}

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
    [Authorize]
    public class NotificationManagerController : ApiController
    {
        [Route("NotificationManager/PushMessage")]
        [HttpPost]
        public string PushMessage(string receiverusername, string notificationmessage, int eventid)
        {
            string message = string.Empty;

            NotificationRepository repository = new NotificationRepository();
            try
            {
                repository.AddMessage(receiverusername, notificationmessage, eventid);
                message = "Message successfully pushed to notification service";
            }
            catch (Exception ex)
            {
                message = "Unable to push message to notification service due error: " + ex.Message;
            }
            return message;
        }

        [Route("NotificationManager/SubscribeEvent")]
        [HttpPost]
        public string SubscribeEvent(string applicationname, string username, int eventid)
        {
            string message = string.Empty;

            NotificationRepository repository = new NotificationRepository();
            try
            {
                repository.SubscribeEvent(applicationname, username, eventid);
                message = "Notification event successfully subscribed";
            }
            catch (Exception ex)
            {
                message = "Unable subscribe notification event due error: " + ex.Message;
            }
            return message;
        }

        [Route("NotificationManager/SubscribeEvents")]
        [HttpPost]
        public string SubscribeEvents(string applicationname, string username, int[] eventids)
        {
            string message = string.Empty;

            NotificationRepository repository = new NotificationRepository();
            try
            {
                repository.SubscribeEvent(applicationname, username, eventids);
                message = "Event(s) subscription saved successfully";
            }
            catch (Exception ex)
            {
                message = "Unable subscribe notification events due error: " + ex.Message;
            }
            return message;
        }

        [Route("NotificationManager/GetSubscriptions")]
        [HttpGet]
        public IEnumerable<NotificationEventSubscriptionDetail> GetSubscriptions(string applicationname, string username)
        {
            NotificationRepository repository = new NotificationRepository();

            var subscriptions = repository.GetSubscription(applicationname, username);
            return subscriptions;
        }

        [Route("NotificationManager/GetSubscription")]
        [HttpGet]
        public NotificationEventSubscriptionDetail GetSubscription(string applicationname, string username, int eventid)
        {
            NotificationRepository repository = new NotificationRepository();

            var subscription = repository.GetSubscription(applicationname, username, eventid);
            return subscription;
        }

        [Route("NotificationManager/GetApplicationGroup")]
        [HttpGet]
        public NotificationApplicationGroupDetail GetApplicationGroup(string applicationName, string groupname)
        {
            NotificationRepository repository = new NotificationRepository();
            var applicationgroup = repository.GetApplicationGroup(applicationName, groupname);
            return applicationgroup;
        }

        [Route("NotificationManager/GetGroupEventsByGroupID")]
        [HttpGet]
        public IEnumerable<NotificationEventGroupDetail> GetGroupEventsByGroupID(int groupid)
        {
            NotificationRepository repository = new NotificationRepository();
            var eventgroups = repository.GetGroupEvent(groupid);
            return eventgroups;
        }

       
        [Route("NotificationManager/GetGroupEvents")]
        [HttpGet]
        public IEnumerable<NotificationEventGroupDetail> GetGroupEvents(string applicationName, string groupname)
        {
            NotificationRepository repository = new NotificationRepository();
            var eventgroups = repository.GetGroupEvent(applicationName, groupname);
            return eventgroups;
        }

        [Route("NotificationManager/GetMessages")]
        [HttpGet]
        public List<NotificationMessage> GetMessages(string applicationname, string username)
        {
            NotificationRepository repository = new NotificationRepository();
            var messases = repository.GetNotificationMessages(applicationname, username);
            return messases;
        }

        [Route("NotificationManager/GetApplicationEvents")]
        [HttpGet]
        public IEnumerable<NotificationEventDetail> GetApplicationEvents(string applicationName)
        {
            NotificationRepository repository = new NotificationRepository();
            var events = repository.GetApplicationEvent(applicationName);
            return events;
        }

        [Route("NotificationManager/HasSubscriptionByEventID")]
        [HttpGet]
        public bool HasEventSubscription(string receiverusername, int eventid)
        {
            NotificationRepository repository = new NotificationRepository();
            return repository.HasEventSubscription(receiverusername, eventid);
        }

        [Route("NotificationManager/HasSubscriptionByEventName")]
        [HttpGet]
        public bool HasEventSubscription(string applicationname, string receiverusername, string eventname)
        {
            NotificationRepository repository = new NotificationRepository();
            return repository.HasEventSubscription(applicationname, receiverusername, eventname);
        }
    }
}

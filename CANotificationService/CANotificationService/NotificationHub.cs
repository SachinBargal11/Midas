using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using CANotificationService.Models;
using CANotificationService.Repository;
using System.Data.Entity;
using System.Security.Claims;

namespace CANotificationService
{
    [Authorize]
    public class NotificationHub : Hub
    {
        public override Task OnConnected()
        {
            var applicationName = Convert.ToString(HttpContext.Current.Request.QueryString["application_name"]);

            var identity = (ClaimsIdentity)Context.User.Identity;
            var username = identity.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").FirstOrDefault().Value; ;

            NotificationRepository repository = new NotificationRepository();

            NotificationUser user = repository.GetUser(username, applicationName);
            if(user != null)
            {
                NotificationUserConnection connection = new NotificationUserConnection
                {
                    UserName = user.UserName,
                    ConnectionId = Context.ConnectionId,
                    UserAgent = Context.Request.Headers["User-Agent"],
                    IsConnected = true
                };

                repository.AddUserConnection(connection);
                Clients.Client(Context.ConnectionId).refreshNotification(repository.GetNotificationMessages(applicationName, username));
            }
           
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            NotificationRepository repository = new NotificationRepository();
            repository.RemoveUserConnection(Context.ConnectionId);
           
            return base.OnDisconnected(stopCalled);
        }
    }
}
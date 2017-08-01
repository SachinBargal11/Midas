using CANotificationService.Models;
using CANotificationService.Repository;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CANotificationService
{
    public class NotificationComponent
    {
       
        public void RegisterNotification(DateTime currentTime)
        {
            string providerConnectionString = new EntityConnectionStringBuilder(ConfigurationManager.ConnectionStrings["NotificationEntities"].ConnectionString.ToString()).ProviderConnectionString;
            string sqlCommand = @"SELECT [Id], [NotificationMessage], [ReceiverUserID], [NotificationTime], [IsRead], [EventID] FROM [dbo].[Message] WHERE [NotificationTime] > @AddedOn";
            //you can notice here I have added table name like this [dbo].[Contacts] with [dbo], its mendatory when you use Sql Dependency
            using (SqlConnection con = new SqlConnection(providerConnectionString))
            {
                SqlCommand cmd = new SqlCommand(sqlCommand, con);
                cmd.Parameters.AddWithValue("@AddedOn", currentTime);
                if (con.State != System.Data.ConnectionState.Open)
                {
                    con.Open();
                }
                cmd.Notification = null;
                SqlDependency sqlDep = new SqlDependency(cmd);
                sqlDep.OnChange += sqlDep_OnChange;
                //we must have to execute the command here
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    // nothing need to add here now
                }
            }
        }

        void sqlDep_OnChange(object sender, SqlNotificationEventArgs e)
        {
            
            if (e.Type == SqlNotificationType.Change)
            {
                //This is how signalrHub can be accessed outside the SignalR Hub Notification.cs file
                var context = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();

                NotificationRepository repository = new NotificationRepository();

                List<NotificationMessage> objList = repository.GetNotificationMessages(NotificationServiceApplication.LastRunTime);

                foreach (var item in objList)
                {
                    List<NotificationUserConnection> userConnections = repository.GetUserConnections(item.ReceiverUserID, item.ApplicationName);
                    foreach(var connection in userConnections)
                    {
                        context.Clients.Client(connection.ConnectionId).addLatestNotification(item);
                    }
                }
                
            }

            NotificationServiceApplication.LastRunTime = DateTime.Now;

            RegisterNotification(NotificationServiceApplication.LastRunTime);
        }
    }
}
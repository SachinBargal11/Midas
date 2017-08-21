using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.BusinessObjects;
using System.Net.Http.Headers;
using System.Configuration;
using System.Web;

namespace MIDAS.GBX.Common
{
    public class NotificationHelper
    {
        public string AccessToken { get; set; }
        public string ApplicationName { get; set; }
        public static string NotificationServiceBaseURL { get; set; }
       


        public NotificationHelper()
        {
            ApplicationName = ConfigurationManager.AppSettings["NotificationApplicationName"];
            NotificationServiceBaseURL = ConfigurationManager.AppSettings["NotificationWebAPIBaseAddress"];
            AccessToken = HttpContext.Current.Request.Headers["Authorization"];
           
            if (AccessToken == null || AccessToken == "")
            {
                GetToken();
            }
        }

        private void GetToken()
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //Set Token endpoint base URL
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["AuthTokenEndpointUrl"]);

            //Get the access token response
            HttpResponseMessage tokenResponse = client.GetAsync(
                string.Format("GetToken?clientid={0}&clientsecret={1}&username={2}&password={3}",
                ConfigurationManager.AppSettings["NotificationServiceClientID"],
                ConfigurationManager.AppSettings["NotificationServiceClientSecret"],
                ConfigurationManager.AppSettings["NotificationServiceClientUser"],
                ConfigurationManager.AppSettings["NotificationServiceClientPassword"])
                ).Result;

            if (tokenResponse.IsSuccessStatusCode)
            {
                //Read Access Token
                var tokenresponse = tokenResponse.Content.ReadAsAsync<dynamic>().Result;

                AccessToken = "Bearer " + tokenresponse.AccessToken;
            }
        }

        public Subscription GetSubscriptionByEventName(string username, string eventname)
        {
            try
            {
                //Set AccessToken to client header
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", AccessToken);
                client.BaseAddress = new Uri(NotificationServiceBaseURL);

                HttpResponseMessage response = client.GetAsync(string.Format("GetSubscriptionByEventName?applicationname={0}&username={1}&eventname={2}", ApplicationName, username, eventname)).Result;

                response.EnsureSuccessStatusCode();
                Subscription subscription = response.Content.ReadAsAsync<Subscription>().Result;

                return subscription;
            }
            catch (Exception e)
            {

            }
            return null;
        }

        public string PushNotification(string username, string message,int eventId )
        {
            try
            {
                //Set AccessToken to client header
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", AccessToken);
                client.BaseAddress = new Uri(NotificationServiceBaseURL);

                HttpResponseMessage response = client.PostAsJsonAsync(string.Format("PushMessage?receiverusername={0}&notificationmessage={1}&eventid={2}", username, message, eventId),"").Result;
              


                response.EnsureSuccessStatusCode();
                string pushStatus = response.Content.ReadAsStringAsync().Result;

                return pushStatus;
            }
            catch (Exception e)
            {

            }
            return null;
        }
    }
}

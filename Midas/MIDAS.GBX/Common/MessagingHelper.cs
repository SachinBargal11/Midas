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
using static MIDAS.GBX.BusinessObjects.GBEnums;

namespace MIDAS.GBX.Common
{
    public class MessagingHelper
    {
        public string AccessToken { get; set; }
        public string ApplicationName { get; set; }
        public static string NotificationServiceBaseURL { get; set; }


        public MessagingHelper()
        {
            ApplicationName = ConfigurationManager.AppSettings["MessagingApplicationName"];
            NotificationServiceBaseURL = ConfigurationManager.AppSettings["MessagingWebAPIBaseAddress"];
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
                ConfigurationManager.AppSettings["MessagingServiceClientID"],
                ConfigurationManager.AppSettings["MessagingServiceClientSecret"],
                ConfigurationManager.AppSettings["MessagingServiceClientUser"],
                ConfigurationManager.AppSettings["MessagingServiceClientPassword"])
                ).Result;

            if (tokenResponse.IsSuccessStatusCode)
            {
                //Read Access Token
                var tokenresponse = tokenResponse.Content.ReadAsAsync<dynamic>().Result;

                AccessToken = "Bearer " + tokenresponse.AccessToken;
            }
        }

        public string AddMessageToEmailQueue(EmailMessage message)
        {
            try
            {
                //Set AccessToken to client header
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", AccessToken);
                client.BaseAddress = new Uri(NotificationServiceBaseURL);

                HttpResponseMessage response = client.PostAsJsonAsync("EMail/AddMessageToQueue", message).Result;

                response.EnsureSuccessStatusCode();
                var status = response.Content.ReadAsStringAsync().Result;

                return status;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public string AddMessageToSMSQueue(SMS message)
        {
            try
            {
                //Set AccessToken to client header
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", AccessToken);
                client.BaseAddress = new Uri(NotificationServiceBaseURL);

                HttpResponseMessage response = client.PostAsJsonAsync("SMS/AddMessageToQueue", message).Result;

                response.EnsureSuccessStatusCode();
                var status = response.Content.ReadAsStringAsync().Result;

                return status;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public PreferedModeOfComunication GetModeOfComunication(int userid, int companyid)
        {
            using (UserPersonalSettingRepository cmp = new UserPersonalSettingRepository(_context))
            {
                UserPersonalSetting userSettings = (UserPersonalSetting)cmp.GetByUserAndCompanyId(userid, companyid);
                if (userSettings != null)
                {
                    return (PreferedModeOfComunication)userSettings.PreferredModeOfCommunication;
                }
                else
                {
                    return PreferedModeOfComunication.Both;
                }
            }

        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using BO= MIDAS.GBX.BusinessObjects;
using System.Net.Http.Headers;
using System.Configuration;
using System.Web;
using static MIDAS.GBX.BusinessObjects.GBEnums;
using MIDAS.GBX.DataRepository.Model;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    public class MessagingHelper
    {
        MIDASGBXEntities _context = new MIDASGBXEntities();
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

        public string AddMessageToEmailQueue(BO.EmailMessage message)
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

        public string AddMessageToSMSQueue(BO.SMS message)
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

        public PreferedModeOfComunication GetModeOfComunication(string userName, int companyid)
        {
            using (UserPersonalSettingRepository cmp = new UserPersonalSettingRepository(_context))

            {
                 BO.UserPersonalSetting userSettings = (BO.UserPersonalSetting)cmp.GetByUserNameAndCompanyId(userName, companyid);
                
              
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

        public PreferedModeOfComunication SendEmailAndSms(string userName,int companyId,BO.EmailMessage emailData,BO.SMS smsData)
        {
            try
            {

                PreferedModeOfComunication predferredModewOfCommunication = GetModeOfComunication(userName, companyId);

                    if(predferredModewOfCommunication==PreferedModeOfComunication.Email)
                    {
                      
                            AddMessageToEmailQueue(emailData);
                            return PreferedModeOfComunication.Email;
                     }
                      else if(predferredModewOfCommunication == PreferedModeOfComunication.SMS)
                      {
                            AddMessageToSMSQueue(smsData);
                            return PreferedModeOfComunication.SMS;
                      }
                        else
                        {
                            AddMessageToEmailQueue(emailData);
                            AddMessageToSMSQueue(smsData);
                            return PreferedModeOfComunication.Both;

                        }
                    
                                                                
               
            }
            catch (Exception e)
            {
                return PreferedModeOfComunication.Both;
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Configuration;
using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json;
using BO = MIDAS.GBX.BusinessObjects;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;

namespace MIDAS.GBX.NotificationService
{
    public partial class SMSService : ServiceBase
    {
        Timer timer1 = null;
        int timeDuration = 60000;

        public SMSService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer1 = new Timer();

            try
            {
                if (ConfigurationManager.AppSettings["TimeDurationInMinutes"] != null)
                {
                    int timeDurationInMinutes;
                    int.TryParse(Convert.ToString(ConfigurationManager.AppSettings["TimeDurationInMinutes"]), out timeDurationInMinutes);
                    if (timeDurationInMinutes > 0)
                    {
                        timeDuration = timeDurationInMinutes * 60 * 1000;
                    }
                }

                this.timer1.Interval = timeDuration;
                this.timer1.Elapsed += new ElapsedEventHandler(this.timer1_Tick);
                this.timer1.Enabled = true;
                WriteLog.WriteLine("SMS Window Service Started. Time Duration is: " + timeDuration.ToString());
            }
            catch
            {
            }
        }

        private void timer1_Tick(object sender, ElapsedEventArgs e)
        {
            try
            {
                HttpClient client = new HttpClient();

                string BaseAddress = Convert.ToString(ConfigurationManager.AppSettings["BaseAddress"]);

                client.BaseAddress = new Uri(BaseAddress);

                HttpResponseMessage respMsg1 = client.GetAsync("midasNotificationAPI/SMSQueueReadWrite/readFromQueue").Result;
                respMsg1.EnsureSuccessStatusCode();
                var SMSSend = respMsg1.Content.ReadAsAsync<List<BO.SMSSend>>().Result;
                //var result = JsonConvert.SerializeObject(SMSSend);
                //WriteLog.WriteLine(result);
                WriteLog.WriteLine("");
                WriteLog.WriteLine("");

                //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //HttpResponseMessage respMsg2 = client.PostAsync("midasNotificationAPI/SendNotificationFromQueue/sendSMS", new StringContent(result, Encoding.UTF8, "application/json")).Result;
                //HttpResponseMessage respMsg2 = client.PostAsync("midasNotificationAPI/SendNotificationFromQueue/sendSMS", SMSSend, ).Result;
                //HttpResponseMessage respMsg2 = client.PostAsJsonAsync<IEnumerable<BO.SMSSend>>("midasNotificationAPI/SendNotificationFromQueue/sendSMS", SMSSend).Result;

                foreach (var item in SMSSend)
                {
                    var result = JsonConvert.SerializeObject(item);
                    HttpResponseMessage respMsg2 = client.PostAsync("midasNotificationAPI/SendNotificationFromQueue/sendSMS", new StringContent(result, Encoding.UTF8, "application/json")).Result;

                    respMsg2.EnsureSuccessStatusCode();
                    var result2 = respMsg2.Content.ReadAsAsync<IEnumerable<BO.SMSSend>>().Result;
                }


                
            }
            catch(Exception ex)
            {
                WriteLog.WriteLine(ex.ToString());
                WriteLog.WriteLine("");
                WriteLog.WriteLine("");
            }
        }

        protected override void OnStop()
        {
            this.timer1.Enabled = false;
            WriteLog.WriteLine("SMS Window Service Stopped.");
        }
    }
}

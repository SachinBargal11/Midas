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
    partial class EMailService : ServiceBase
    {
        Timer timer1 = null;
        int timeDuration = 3 * 60 * 1000;

        public EMailService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer1 = new Timer();

            try
            {
                if (ConfigurationManager.AppSettings["TimeDurationInMinutes_EMail"] != null)
                {
                    int timeDurationInMinutes;
                    int.TryParse(Convert.ToString(ConfigurationManager.AppSettings["TimeDurationInMinutes_EMail"]), out timeDurationInMinutes);
                    if (timeDurationInMinutes > 0)
                    {
                        timeDuration = timeDurationInMinutes * 60 * 1000;
                    }
                }

                this.timer1.Interval = timeDuration;
                this.timer1.Elapsed += new ElapsedEventHandler(this.timer1_Tick);
                this.timer1.Enabled = true;
                WriteLog.WriteLine(this.ServiceName, "EMail Window Service Started. Time Duration is: " + timeDuration.ToString());
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
                BaseAddress = BaseAddress.TrimEnd("/".ToCharArray()) + "/";

                if (BaseAddress.Trim() == "")
                {
                    throw new Exception("BaseAddress Missing in config.");
                }

                client.BaseAddress = new Uri(BaseAddress);

                HttpResponseMessage respMsg1 = client.GetAsync("midasNotificationAPI/EMailQueue/readFromQueue").Result;
                respMsg1.EnsureSuccessStatusCode();
                var EMailListSend = respMsg1.Content.ReadAsAsync<List<BO.EMailSend>>().Result;

                if (EMailListSend != null && EMailListSend.Count > 0)
                {
                    var result = JsonConvert.SerializeObject(EMailListSend);
                    HttpResponseMessage respMsg2 = client.PostAsync("midasNotificationAPI/SendEMail/SendEMailList", new StringContent(result, Encoding.UTF8, "application/json")).Result;
                    respMsg2.EnsureSuccessStatusCode();
                    var result2 = respMsg2.Content.ReadAsAsync<List<BO.EMailQueue>>().Result;

                    int TotalCount = result2.Count;
                    int EMailSentSuccess = result2.Where(p => p.DeliveryDate.HasValue == true).Count();

                    WriteLog.WriteLine(this.ServiceName, string.Format("Service Called: EMail send ({0} of {1}).", EMailSentSuccess, TotalCount));
                }
                else
                {
                    WriteLog.WriteLine(this.ServiceName, "Service Called: No Email to be sent.");
                }
            }
            catch (Exception ex)
            {
                WriteLog.WriteLine(this.ServiceName, ex.ToString());
            }
        }

        protected override void OnStop()
        {
            this.timer1.Enabled = false;
            WriteLog.WriteLine(this.ServiceName, "EMail Window Service Stopped.");
        }
    }
}

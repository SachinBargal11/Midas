using MessagingServiceManager.Business;
using MessagingServiceManager.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.ServiceProcess;
using System.Timers;

namespace MessagingService
{
    partial class SMSService : ServiceBase
    {
        Timer smsTimer = null;

        public SMSService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            smsTimer = new Timer();
            int timeDuration = 10 * 60 * 1000;

            try
            {
                if (ConfigurationManager.AppSettings["SMSServiceRunInterval"] != null)
                {
                    int timeDurationInMinutes;
                    int.TryParse(Convert.ToString(ConfigurationManager.AppSettings["SMSServiceRunInterval"]), out timeDurationInMinutes);
                    if (timeDurationInMinutes > 0)
                    {
                        timeDuration = timeDurationInMinutes * 60 * 1000;
                    }
                }

                this.smsTimer.Interval = timeDuration;
                this.smsTimer.Elapsed += new ElapsedEventHandler(this.smsTimer_Tick);
                this.smsTimer.Enabled = true;
                LogWriter.WriteLine(this.ServiceName, "SMS Delivery Service Started. Time Duration is: " + timeDuration.ToString());
            }
            catch (Exception ex)
            {
                LogWriter.WriteLine(this.ServiceName, ex.ToString());
            }
        }

        protected override void OnStop()
        {
            this.smsTimer.Enabled = false;
            LogWriter.WriteLine(this.ServiceName, "SMS Delivery Service Stopped.");
        }

        private void smsTimer_Tick(object sender, ElapsedEventArgs e)
        {
            try
            {
                int totalSMSProcessed = 0;
                int smsDeliveredSuccessfully = 0;
                int smsFailedToDeliver = 0;

                IMessageManager<SMS,SMSQueueItem> smsmanager = new SMSManager();
                List<SMSQueueItem> smsqueueItems = smsmanager.GetPendingMessages().ToList();

                foreach (var item in smsqueueItems)
                {
                    MessageDeliveryStatus status = smsmanager.SendMessage(item);
                    totalSMSProcessed++;
                    if (status == MessageDeliveryStatus.Delivered)
                    {
                        smsDeliveredSuccessfully++;
                    }
                    else
                    {
                        smsFailedToDeliver++;
                    }
                }

                LogWriter.WriteLine(this.ServiceName, 
                    string.Format("SMS Delivery Service Called: {0} messages out of {1} sent successfully while {2} messages could not be sent at moment",
                    smsDeliveredSuccessfully, 
                    totalSMSProcessed, 
                    smsFailedToDeliver));

            }
            catch (Exception ex)
            {
                LogWriter.WriteLine(this.ServiceName, ex.ToString());
            }
        }
    }
}

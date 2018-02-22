using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.ServiceProcess;
using System.Timers;
using MessagingServiceManager.Entities;
using MessagingServiceManager.Business;

using System.Net.Mail;
using System.Net;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

namespace MessagingService
{
    public partial class EmailService : ServiceBase
    {
        Timer emailTimer = null;

        public EmailService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            emailTimer = new Timer();
            int timeDuration = 10 * 60 * 1000;

            try
            {
                if (ConfigurationManager.AppSettings["EmailServiceRunInterval"] != null)
                {
                    int timeDurationInMinutes;
                    int.TryParse(Convert.ToString(ConfigurationManager.AppSettings["EmailServiceRunInterval"]), out timeDurationInMinutes);
                    if (timeDurationInMinutes > 0)
                    {
                        timeDuration = timeDurationInMinutes * 60 * 1000;
                    }
                }

                this.emailTimer.Interval = timeDuration;
                this.emailTimer.Elapsed += new ElapsedEventHandler(this.emailTimer_Tick);
                this.emailTimer.Enabled = true;
                LogWriter.WriteLine(this.ServiceName, "Email Delivery Service Started. Time Duration is: " + timeDuration.ToString());
            }
            catch (Exception ex)
            {
                LogWriter.WriteLine(this.ServiceName, ex.ToString());
            }
        }

        protected override void OnStop()
        {
            this.emailTimer.Enabled = false;
            LogWriter.WriteLine(this.ServiceName, "Email Delivery Service Stopped.");
        }

        private void emailTimer_Tick(object sender, ElapsedEventArgs e)
        {
            try
            {
                int totalEmailsProcessed = 0;
                int emailsDeliveredSuccessfully = 0;
                int emailsFailedToDeliver = 0;

                IMessageManager<EmailMessage, EMailQueueItem> emailmanager = new EMailManager();

                List<EMailQueueItem> emailqueueItems = emailmanager.GetPendingMessages().ToList();

                foreach (var item in emailqueueItems)
                {
                    MessageDeliveryStatus status = emailmanager.SendMessage(item);
                    totalEmailsProcessed++;
                    if (status == MessageDeliveryStatus.Delivered)
                    {
                        emailsDeliveredSuccessfully++;
                    }
                    else
                    {
                        emailsFailedToDeliver++;
                    }
                }

                LogWriter.WriteLine(this.ServiceName, 
                    string.Format("Email Delivery Service Called: {0} emailes out of {1} sent successfully while {2} emails could not be sent at moment", 
                    emailsDeliveredSuccessfully, 
                    totalEmailsProcessed, 
                    emailsFailedToDeliver));

            }
            catch (Exception ex)
            {
                LogWriter.WriteLine(this.ServiceName, ex.ToString());
            }
        }

    }
}

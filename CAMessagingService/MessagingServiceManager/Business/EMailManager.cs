using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MessagingServiceManager.Entities;
using System.Net.Mail;
using System.Net;
using Newtonsoft.Json;

namespace MessagingServiceManager.Business
{
    public class EMailManager : IMessageManager<EmailMessage, EMailQueueItem>
    {
        public void AddMessageToQueue(EmailMessage messageitem)
        {
            Repository.MessagingRepository repository = new Repository.MessagingRepository();
            Application application = repository.GetApplication(messageitem.ApplicationName);

            if (application != null)
            {
                EMailQueueItem emailQueueItem = new EMailQueueItem();

                emailQueueItem.ApplicationID = application.Id;

                emailQueueItem.StatusID = (int)MessageDeliveryStatus.Scheduled;
                emailQueueItem.CreatedDate = DateTime.Now;
                emailQueueItem.EmailObject = Utility.ObjectToByteArray(messageitem);

                repository.AddEmailToQueue(emailQueueItem);
            }
        }

        public MessageDeliveryStatus SendMessage(EMailQueueItem emailqueueitem)
        {
            Repository.MessagingRepository repository = new Repository.MessagingRepository();
            int status;
            var emailConfiguration = repository.GetEmailConfiguration(emailqueueitem.ApplicationID);

            if (emailConfiguration != null)
            {
                EmailMessage emailMessage = (EmailMessage)Utility.ByteArrayToObject(emailqueueitem.EmailObject);

                var message = (EmailMessage)Utility.ByteArrayToObject(emailqueueitem.EmailObject);

                using (var mail = new System.Net.Mail.MailMessage(message.FromEmail, message.ToEmail, message.EMailSubject, message.EMailBody))
                {
                    if (message.CcEmail != null && message.CcEmail != string.Empty)
                    {
                        mail.CC.Add(message.CcEmail);
                    }

                    if (message.BccEmail != null && message.BccEmail != string.Empty)
                    {
                        mail.Bcc.Add(message.BccEmail);
                    }
                    mail.IsBodyHtml = true;

                    try
                    {
                        using (var client = new SmtpClient(emailConfiguration.SMTPClientHostName, emailConfiguration.SmtpClientPortNumber))
                        {
                            emailqueueitem.NumberOfAttempts += 1;

                            client.Credentials = new NetworkCredential(emailConfiguration.SMTPClientUserName, emailConfiguration.SMTPClientPassword);
                            client.EnableSsl = emailConfiguration.IsSSLEnabled;

                            client.Send(mail);
                            status = (int)MessageDeliveryStatus.Delivered;
                            emailqueueitem.StatusID = (int)MessageDeliveryStatus.Delivered;
                            emailqueueitem.DeliveryResponse = "Email delivered successfully";
                            emailqueueitem.DeliveryDate = DateTime.Now;
                        }
                    }
                    catch (SmtpFailedRecipientsException ex)
                    {
                        emailqueueitem.DeliveryResponse = JsonConvert.SerializeObject(ex);

                        if (emailConfiguration.MaxNumberOfRetry >= emailqueueitem.NumberOfAttempts)
                        {
                            emailqueueitem.StatusID = (int)MessageDeliveryStatus.Failed;
                        }
                        status = (int)MessageDeliveryStatus.Failed;
                    }
                    finally
                    {
                        repository.UpdateEmailToQueue(emailqueueitem);
                    }
                }
            }
            else
            {
                status = (int)MessageDeliveryStatus.Failed;
            }
            return (MessageDeliveryStatus)status;
        }

        public MessageDeliveryStatus SendMessageInstantly(EmailMessage messageitem)
        {
            int status;
            Repository.MessagingRepository repository = new Repository.MessagingRepository();
            Application application = repository.GetApplication(messageitem.ApplicationName);

            if (application != null)
            {
                var emailConfiguration = repository.GetEmailConfiguration(application.Id);

                if (emailConfiguration != null)
                {
                    using (var mail = new System.Net.Mail.MailMessage(
                        messageitem.FromEmail, 
                        messageitem.ToEmail, 
                        messageitem.EMailSubject, 
                        messageitem.EMailBody))
                    {
                        if (messageitem.CcEmail != null && messageitem.CcEmail != string.Empty)
                        {
                            mail.CC.Add(messageitem.CcEmail);
                        }

                        if (messageitem.BccEmail != null && messageitem.BccEmail != string.Empty)
                        {
                            mail.Bcc.Add(messageitem.BccEmail);
                        }
                        mail.IsBodyHtml = true;

                        EMailQueueItem emailQueueItem = new EMailQueueItem();

                        emailQueueItem.ApplicationID = application.Id;
                        emailQueueItem.CreatedDate = DateTime.Now;
                        emailQueueItem.EmailObject = Utility.ObjectToByteArray(messageitem);
                        emailQueueItem.NumberOfAttempts = -1;

                        try
                        {
                            using (var client = new SmtpClient(emailConfiguration.SMTPClientHostName, emailConfiguration.SmtpClientPortNumber))
                            {
                                client.Credentials = new NetworkCredential(emailConfiguration.SMTPClientUserName, emailConfiguration.SMTPClientPassword);
                                client.EnableSsl = emailConfiguration.IsSSLEnabled;

                                client.Send(mail);

                                emailQueueItem.StatusID = (int)MessageDeliveryStatus.Delivered;
                                emailQueueItem.DeliveryResponse = "Email delivered successfully";
                                emailQueueItem.DeliveryDate = DateTime.Now;
                                status = (int)MessageDeliveryStatus.Delivered;
                            }
                        }
                        catch (SmtpFailedRecipientsException ex)
                        {
                            emailQueueItem.DeliveryResponse = JsonConvert.SerializeObject(ex);
                            emailQueueItem.StatusID = (int)MessageDeliveryStatus.Failed;
                            status = (int)MessageDeliveryStatus.Failed;
                        }
                        finally
                        {
                            repository.AddEmailToQueue(emailQueueItem);
                        }
                    }
                }
                else
                {
                    status = (int)MessageDeliveryStatus.Failed;
                }
            }
            else
            {
                status = (int)MessageDeliveryStatus.Failed;
            }

            return (MessageDeliveryStatus)status;
        }

        public IEnumerable<EMailQueueItem> GetPendingMessages()
        {
            Repository.MessagingRepository repository = new Repository.MessagingRepository();
            return repository.GetPendingEmailFromQueue().ToList();
        }
    }
}

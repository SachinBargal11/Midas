using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using MessagingServiceManager.Entities;
using Newtonsoft.Json;

namespace MessagingServiceManager.Business
{
    public class SMSManager : IMessageManager<SMS, SMSQueueItem>
    {
        public void AddMessageToQueue(SMS messageItem)
        {
            Repository.MessagingRepository repository = new Repository.MessagingRepository();
            Application application = repository.GetApplication(messageItem.ApplicationName);

            if (application != null)
            {
                SMSQueueItem smsQueueItem = new SMSQueueItem();

                smsQueueItem.ApplicationID = application.Id;
                smsQueueItem.StatusID = (int)MessageDeliveryStatus.Scheduled;
                smsQueueItem.CreatedDate = DateTime.Now;
                smsQueueItem.SMSObject = Utility.ObjectToByteArray(messageItem.Message);
                smsQueueItem.ApplicationName = messageItem.ApplicationName;
                smsQueueItem.ToNumber = messageItem.ToNumber;
                smsQueueItem.FromNumber = messageItem.FromNumber;
                smsQueueItem.Message = messageItem.Message;


                repository.AddSMSToQueue(smsQueueItem);
            }
        }

        public MessageDeliveryStatus SendMessage(SMSQueueItem smsqueueitem)
        {
            int status;

            Repository.MessagingRepository repository = new Repository.MessagingRepository();

            var smsConfiguration = repository.GetSMSConfiguration(smsqueueitem.ApplicationID);

            if (smsConfiguration != null)
            {
                TwilioClient.Init(smsConfiguration.AccountSid, smsConfiguration.AuthToken);

                //SMS sms = (SMS)Utility.ByteArrayToObject(smsqueueitem.SMSObject);

                var message = MessageResource.Create(
                    to: new PhoneNumber(smsqueueitem.ToNumber),
                    from: new PhoneNumber(smsConfiguration.SMSFromPhoneNumber),
                    body: smsqueueitem.Message
                );

                smsqueueitem.DeliveryResponse = JsonConvert.SerializeObject(message);
                smsqueueitem.NumberOfAttempts += 1;

                if (message.Status == MessageResource.StatusEnum.Failed || message.Status == MessageResource.StatusEnum.Undelivered)
                {
                    status = (int)MessageDeliveryStatus.Failed;
                    if (smsConfiguration.MaxNumberOfRetry >= smsqueueitem.NumberOfAttempts)
                    {
                        smsqueueitem.StatusID = (int)MessageDeliveryStatus.Failed;
                    }
                }
                else
                {
                    status = (int)MessageDeliveryStatus.Delivered;
                    smsqueueitem.StatusID = (int)MessageDeliveryStatus.Delivered;
                    smsqueueitem.DeliveryDate = message.DateSent.HasValue ? message.DateSent : message.DateUpdated;
                }
                repository.UpdateSMSToQueue(smsqueueitem);
            }
            else
            {
                status = (int)MessageDeliveryStatus.Failed;
            }
            return (MessageDeliveryStatus)status;
        }

        public MessageDeliveryStatus SendMessageInstantly(SMS messageItem)
        {
            int status;
            Repository.MessagingRepository repository = new Repository.MessagingRepository();

            Application application = repository.GetApplication(messageItem.ApplicationName);

            if (application != null)
            {
                SMSQueueItem smsQueueItem = new SMSQueueItem();

                smsQueueItem.ApplicationID = application.Id;

                var smsConfiguration = repository.GetSMSConfiguration(application.Id);

                if (smsConfiguration != null)
                {
                    TwilioClient.Init(smsConfiguration.AccountSid, smsConfiguration.AuthToken);

                    var message = MessageResource.Create(
                        to: new PhoneNumber(messageItem.ToNumber),
                        from: new PhoneNumber(smsConfiguration.SMSFromPhoneNumber),
                        body: messageItem.Message
                    );

                    smsQueueItem.DeliveryResponse = JsonConvert.SerializeObject(messageItem);

                    if (message.Status == MessageResource.StatusEnum.Failed || message.Status == MessageResource.StatusEnum.Undelivered)
                    {
                        smsQueueItem.StatusID = (int)MessageDeliveryStatus.Failed;
                        status = (int)MessageDeliveryStatus.Failed;
                    }
                    else
                    {
                        smsQueueItem.StatusID = (int)MessageDeliveryStatus.Delivered;
                        smsQueueItem.DeliveryDate = message.DateSent.HasValue ? message.DateSent : message.DateUpdated;
                        status = (int)MessageDeliveryStatus.Delivered;
                    }

                    smsQueueItem.CreatedDate = DateTime.Now;
                    smsQueueItem.SMSObject = Utility.ObjectToByteArray(messageItem.Message);
                    smsQueueItem.NumberOfAttempts = -1;

                    repository.AddSMSToQueue(smsQueueItem);
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

        public IEnumerable<SMSQueueItem> GetPendingMessages()
        {
            Repository.MessagingRepository repository = new Repository.MessagingRepository();
            return repository.GetPendingSMSFromQueue().ToList();
        }
    }
}

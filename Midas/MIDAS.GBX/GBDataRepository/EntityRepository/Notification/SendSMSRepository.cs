using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class SendSMSRepository : BaseEntityRepo, IDisposable
    {
        public SendSMSRepository(MIDASGBXEntities context) : base(context)
        {
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Get By ID
        public override object SendSMSFromQueue<T>(T entity)
        {
            BO.SMSQueue SMSNotificationBO = (BO.SMSQueue)(object)entity;

            int AppId = SMSNotificationBO.AppId;
            var smsAccount = _context.SMSConfigurations.Where(p => p.AppId == AppId && p.IsDeleted == false)
                                                       .Select(p => new { p.AccountSid, p.AuthToken })
                                                       .FirstOrDefault();

            string accountSid = smsAccount.AccountSid;
            string authToken = smsAccount.AuthToken;            

            var FromNumber = new PhoneNumber(SMSNotificationBO.FromNumber);
            var ToNumber = new PhoneNumber(SMSNotificationBO.ToNumber);

            var Message = SMSNotificationBO.Message;

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                ToNumber,
                from: FromNumber,
                body: Message
            );

            SMSQueue SMSQueueDB = _context.SMSQueues.Where(p => p.Id == SMSNotificationBO.ID).FirstOrDefault();

            if (message.Status == MessageResource.StatusEnum.Sent || message.Status == MessageResource.StatusEnum.Delivered)
            {                
                if (SMSQueueDB != null)
                {
                    SMSQueueDB.DeliveryDate = message.DateSent;
                    SMSQueueDB.NumberOfAttempts += 1;
                    SMSQueueDB.ResultObject = "";

                    _context.SaveChanges();
                }
            }
            else
            {
                SMSQueueDB.NumberOfAttempts += 1;
                SMSQueueDB.ResultObject = "";

                _context.SaveChanges();
            }

            return (object)true;
        }
        #endregion

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}

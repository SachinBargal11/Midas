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
using Newtonsoft.Json;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class SendSMSRepository : BaseEntityRepo, IDisposable
    {
        public SendSMSRepository(MIDASGBXEntities context) : base(context)
        {
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            SMSQueue SMSQueueDB = entity as SMSQueue;

            if (SMSQueueDB == null)
                return default(T);

            BO.SMSSend SMSSendBO = new BO.SMSSend();

            SMSSendBO.ID = SMSQueueDB.Id;
            SMSSendBO.AppId = SMSQueueDB.AppId;
            SMSSendBO.FromNumber = SMSQueueDB.FromNumber;
            SMSSendBO.ToNumber = SMSQueueDB.ToNumber;
            SMSSendBO.Message = SMSQueueDB.Message;
            SMSSendBO.NumberOfAttempts = SMSQueueDB.NumberOfAttempts;
            SMSSendBO.ResultObject = SMSQueueDB.ResultObject;
            SMSSendBO.CreatedDate = SMSQueueDB.CreatedDate;

            return (T)(object)SMSSendBO;
        }
        #endregion

        #region Get By ID
        public override object SendSMSFromQueue<T>(T entity)
        {
            BO.SMSSend SMSSendBO = (BO.SMSSend)(object)entity;

            int AppId = SMSSendBO.AppId;
            var smsAccount = _context.SMSConfigurations.Where(p => p.AppId == AppId && p.IsDeleted == false)
                                                       .Select(p => new { p.AccountSid, p.AuthToken })
                                                       .FirstOrDefault();

            string accountSid = smsAccount.AccountSid;
            string authToken = smsAccount.AuthToken;            

            var FromNumber = new PhoneNumber(SMSSendBO.FromNumber);
            var ToNumber = new PhoneNumber(SMSSendBO.ToNumber);

            var Message = SMSSendBO.Message;

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                ToNumber,
                from: FromNumber,
                body: Message
            );

            SMSQueue SMSQueueDB = _context.SMSQueues.Where(p => p.Id == SMSSendBO.ID).FirstOrDefault();

            if (message.Status == MessageResource.StatusEnum.Failed || message.Status == MessageResource.StatusEnum.Undelivered)
            {
                SMSQueueDB.NumberOfAttempts += 1;
                SMSQueueDB.ResultObject = JsonConvert.SerializeObject(message);

                _context.SaveChanges();
            }
            else
            {
                if (SMSQueueDB != null)
                {
                    SMSQueueDB.DeliveryDate = message.DateSent;
                    SMSQueueDB.NumberOfAttempts += 1;
                    SMSQueueDB.ResultObject = JsonConvert.SerializeObject(message);

                    _context.SaveChanges();
                }
            }

            var res = Convert<BO.SMSSend, SMSQueue>(SMSQueueDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}

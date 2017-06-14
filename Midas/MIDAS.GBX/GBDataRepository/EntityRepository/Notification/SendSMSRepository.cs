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

            BO.SMSQueue SMSQueueBO = new BO.SMSQueue();

            SMSQueueBO.ID = SMSQueueDB.Id;
            SMSQueueBO.AppId = SMSQueueDB.AppId;
            SMSQueueBO.FromNumber = SMSQueueDB.FromNumber;
            SMSQueueBO.ToNumber = SMSQueueDB.ToNumber;
            SMSQueueBO.Message = SMSQueueDB.Message;
            SMSQueueBO.NumberOfAttempts = SMSQueueDB.NumberOfAttempts;            
            SMSQueueBO.CreatedDate = SMSQueueDB.CreatedDate;
            SMSQueueBO.DeliveryDate = SMSQueueDB.DeliveryDate;
            SMSQueueBO.ResultObject = SMSQueueDB.ResultObject;

            return (T)(object)SMSQueueBO;
        }
        #endregion

        #region Send SMS From Queue
        public override object SendSMSFromQueue<T>(T entity)
        {
            BO.SMSSend SMSSendBO = (BO.SMSSend)(object)entity;

            string accountSid = SMSSendBO.AccountSid;
            string authToken = SMSSendBO.AuthToken;            

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

        #region Send SMS List From Queue
        public override object SendListFromQueue<T>(List<T> entity)
        {
            List<BO.SMSSend> SMSListSendBO = (List<BO.SMSSend>)(object)entity;
            List<BO.SMSQueue> SMSListQueueBOResult = new List<BO.SMSQueue>();

            foreach (var eachSMS in SMSListSendBO)
            {
                string accountSid = eachSMS.AccountSid;
                string authToken = eachSMS.AuthToken;

                var FromNumber = new PhoneNumber(eachSMS.FromNumber);
                var ToNumber = new PhoneNumber(eachSMS.ToNumber);

                var Message = eachSMS.Message;

                TwilioClient.Init(accountSid, authToken);

                var message = MessageResource.Create(
                    ToNumber,
                    from: FromNumber,
                    body: Message
                );

                SMSQueue SMSQueueDB = _context.SMSQueues.Where(p => p.Id == eachSMS.ID).FirstOrDefault();

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

                var result = Convert<BO.SMSQueue, SMSQueue>(SMSQueueDB);
                SMSListQueueBOResult.Add(result);
            }

            return (object)SMSListQueueBOResult;
        }
        #endregion

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}

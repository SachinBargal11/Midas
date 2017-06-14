using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using System.Data.Linq;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class SMSQueueRepository : BaseEntityRepo, IDisposable
    {
        public SMSQueueRepository(MIDASGBXEntities context) : base(context)
        {
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            SMSQueue SMSQueueDB = entity as SMSQueue;

            if (SMSQueueDB == null)
                return default(T);

            BO.SMSQueue SMSNotificationBO = new BO.SMSQueue();

            SMSNotificationBO.ID = SMSQueueDB.Id;
            SMSNotificationBO.AppId = SMSQueueDB.AppId;
            SMSNotificationBO.FromNumber = SMSQueueDB.FromNumber;
            SMSNotificationBO.ToNumber = SMSQueueDB.ToNumber;
            SMSNotificationBO.Message = SMSQueueDB.Message;
            SMSNotificationBO.CreatedDate = SMSQueueDB.CreatedDate;
            SMSNotificationBO.DeliveryDate = SMSQueueDB.DeliveryDate;
            SMSNotificationBO.NumberOfAttempts = SMSQueueDB.NumberOfAttempts;
            SMSNotificationBO.ResultObject = SMSQueueDB.ResultObject;

            return (T)(object)SMSNotificationBO;
        }
        #endregion

        #region Add SMS To Queue
        public override object AddToQueue<T>(T entity)
        {
            BO.SMSQueue SMSNotificationBO = (BO.SMSQueue)(object)entity;

            SMSQueue SMSQueueDB = new SMSQueue();
            SMSQueueDB.AppId = SMSNotificationBO.AppId;
            SMSQueueDB.FromNumber = SMSNotificationBO.FromNumber;
            SMSQueueDB.ToNumber = SMSNotificationBO.ToNumber;
            SMSQueueDB.Message = SMSNotificationBO.Message;
            SMSQueueDB.CreatedDate = DateTime.UtcNow;

            _context.SMSQueues.Add(SMSQueueDB);
            _context.SaveChanges();

            var res = Convert<BO.SMSQueue, SMSQueue>(SMSQueueDB);
            return (object)res;
        }
        #endregion

        #region Read SMS From Queue
        public override object ReadFromQueue()
        {
            //BO.SMSSend SMSSendBO = new BO.SMSSend();

            //var SMSQueueDB = _context.SMSQueues.Where(p => p.DeliveryDate.HasValue == false && p.NumberOfAttempts < 5)
            //                                   .Join(_context.SMSConfigurations, 
            //                                        smsQ => smsQ.AppId, 
            //                                        smsC => smsC.AppId, 
            //                                        (smsQ, smsC) => new { });

            List<BO.SMSSend> SMSSendBO = (from smsQ in _context.SMSQueues
                                          join smsC in _context.SMSConfigurations
                                              on smsQ.AppId equals smsC.AppId
                                          where smsC.QueueTypeId == 1
                                              && smsQ.DeliveryDate.HasValue == false
                                              && smsQ.NumberOfAttempts < 5
                                          select new BO.SMSSend
                                          {
                                              ID = smsQ.Id,
                                              AppId = smsQ.AppId,
                                              AccountSid = smsC.AccountSid,
                                              AuthToken = smsC.AuthToken,
                                              FromNumber = smsQ.FromNumber,
                                              ToNumber = smsQ.ToNumber,
                                              Message = smsQ.Message,
                                              CreatedDate = smsQ.CreatedDate,
                                              DeliveryDate = smsQ.DeliveryDate,
                                              NumberOfAttempts = smsQ.NumberOfAttempts,
                                              //ResultObject = smsQ.ResultObject
                                          }).ToList();
                        
            return (object)SMSSendBO;
        }
        #endregion

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}

using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class SMSNotificationRepository : BaseEntityRepo, IDisposable
    {
        public SMSNotificationRepository(MIDASGBXEntities context) : base(context)
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

            return (T)(object)SMSNotificationBO;
        }
        #endregion

        #region Get By ID
        public override object AddSMSToQueue<T>(T entity)
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

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}

using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;
using System.Data.Linq;

namespace MIDAS.GBX.DataRepository.EntityRepository.Notification
{
    internal class EMailQueueReadWriteRepository : BaseEntityRepo, IDisposable
    {
        public EMailQueueReadWriteRepository(MIDASGBXEntities context) : base(context)
        {
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Add SMS To Queue
        public override object AddToQueue<T>(T entity)
        {
            BO.EMailQueue EMailQueueBO = (BO.EMailQueue)(object)entity;

            SMSQueue SMSQueueDB = new SMSQueue();
            SMSQueueDB.AppId = EMailQueueBO.AppId;
            SMSQueueDB.FromNumber = EMailQueueBO.FromNumber;
            SMSQueueDB.ToNumber = EMailQueueBO.ToNumber;
            SMSQueueDB.Message = EMailQueueBO.Message;
            SMSQueueDB.CreatedDate = DateTime.UtcNow;

            _context.SMSQueues.Add(SMSQueueDB);
            _context.SaveChanges();

            var res = Convert<BO.SMSQueue, SMSQueue>(SMSQueueDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}

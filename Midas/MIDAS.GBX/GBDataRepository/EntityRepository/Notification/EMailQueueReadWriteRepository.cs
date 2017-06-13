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
    internal class EMailQueueReadWriteRepository : BaseEntityRepo, IDisposable
    {
        public EMailQueueReadWriteRepository(MIDASGBXEntities context) : base(context)
        {
            context.Configuration.ProxyCreationEnabled = false;
        }

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            EMailQueue EMailQueueDB = entity as EMailQueue;

            if (EMailQueueDB == null)
                return default(T);

            BO.EMailQueue EMailQueueBO = new BO.EMailQueue();

            EMailQueueBO.ID = EMailQueueDB.Id;
            EMailQueueBO.AppId = EMailQueueDB.AppId;
            EMailQueueBO.FromEmail = EMailQueueDB.FromEmail;
            EMailQueueBO.ToEmail = EMailQueueDB.ToEmail;
            EMailQueueBO.CcEmail = EMailQueueDB.CcEmail;
            EMailQueueBO.BccEmail = EMailQueueDB.BccEmail;
            EMailQueueBO.EMailSubject = EMailQueueDB.EMailSubject;
            EMailQueueBO.EMailBody = EMailQueueDB.EMailBody;
            EMailQueueBO.CreatedDate = EMailQueueDB.CreatedDate;
            EMailQueueBO.DeliveryDate = EMailQueueDB.DeliveryDate;
            EMailQueueBO.NumberOfAttempts = EMailQueueDB.NumberOfAttempts;
            EMailQueueBO.ResultObject = EMailQueueDB.ResultObject;

            return (T)(object)EMailQueueBO;
        }
        #endregion

        #region Add SMS To Queue
        public override object AddToQueue<T>(T entity)
        {
            BO.EMailQueue EMailQueueBO = (BO.EMailQueue)(object)entity;

            EMailQueue EMailQueueDB = new EMailQueue();
            EMailQueueDB.AppId = EMailQueueBO.AppId;
            EMailQueueDB.FromEmail = EMailQueueBO.FromEmail;
            EMailQueueDB.ToEmail = EMailQueueBO.ToEmail;
            EMailQueueDB.CcEmail = EMailQueueBO.CcEmail;
            EMailQueueDB.BccEmail = EMailQueueBO.BccEmail;
            EMailQueueDB.EMailSubject = EMailQueueBO.EMailSubject;
            EMailQueueDB.EMailBody = EMailQueueBO.EMailBody;
            EMailQueueDB.CreatedDate = DateTime.UtcNow;

            _context.EMailQueues.Add(EMailQueueDB);
            _context.SaveChanges();

            var res = Convert<BO.EMailQueue, EMailQueue>(EMailQueueDB);
            return (object)res;
        }
        #endregion

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}

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

        #region Get By ID
        public override object AddSMSToQueue<T>(T entity)
        {
            BO.SMSNotification SMSNotificationBO = (BO.SMSNotification)(object)entity;
            
            

            return (object)new object();
        }
        #endregion

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}

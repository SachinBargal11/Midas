using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EntityRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            //var acc = _context.Notifications
            //                                .Where(p => p.Id == id
            //                                && (p.IsDeleted.HasValue == false || (p.IsDeleted.HasValue == true && p.IsDeleted.Value == false)))
            //                                .FirstOrDefault<Notification>();

            //BO.Notification2 acc_ = Convert<BO.Notification2, Notification>(acc);

            //if (acc_ == null)
            //{
            //    return new BO.ErrorObject { ErrorMessage = "No record found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            //}

            return (object)new object();
        }
        #endregion

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}

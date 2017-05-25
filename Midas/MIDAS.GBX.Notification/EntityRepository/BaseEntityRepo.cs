using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MIDAS.GBX.Notification.EntityRepository
{
    internal abstract class BaseEntityRepo
    {
        //internal MIDASGBXEntities _context;
        //private const int ApplicationTypeId = 202;
        public BaseEntityRepo()
        {
            //_context = context;
        }

        #region Virtual Methods
        public virtual object SendSMS<T>(T smsObject)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
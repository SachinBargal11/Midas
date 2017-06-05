using MIDAS.GBX.Notification.EntityRepository;
using MIDAS.GBX.Notification.EntityRepository.SMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.Notification
{
    internal class RepoFactory
    {
        internal static BaseEntityRepo GetRepo<T>()
        {
            BaseEntityRepo repo = null;
            if (typeof(T) == typeof(BO.SMS2))
            {
                repo = new SMSRepository();
            }
            else if (typeof(T) == typeof(BO.MultipleSMS))
            {
                repo = new SMSRepository();
            }

            return repo;
        }
    }
}
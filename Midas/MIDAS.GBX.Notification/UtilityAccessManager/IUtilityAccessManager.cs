using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.Notification.UtilityAccessManager
{
    public interface IUtilityAccessManager<T>
    {
        Object SendSMS(T smsObject);
        Object SendMultipleSMS(T multipleSMSObject);
    }
}

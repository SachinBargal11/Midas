﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.DataRepository
{
    public interface IGbNotificationManager<T>
    {
        Object AddSMSToQueue(T smsObject);
        Object ReadSMSFromQueue();

        Object SendSMSFromQueue(T smsObject);
        Object SendSMSListFromQueue(List<T> smsObject);
    }
}

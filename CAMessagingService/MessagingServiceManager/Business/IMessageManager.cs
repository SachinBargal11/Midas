using MessagingServiceManager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessagingServiceManager.Business
{
    public interface IMessageManager<T,T1>
    {
        void AddMessageToQueue(T message);
        MessageDeliveryStatus SendMessage(T1 messagequeueitem);
        MessageDeliveryStatus SendMessageInstantly(T message);
        IEnumerable<T1> GetPendingMessages();
    }
}

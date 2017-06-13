using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace MIDAS.GBX.Notification.RequestHandler
{
    public interface IRequestHandler<T>
    {
        HttpResponseMessage AddToQueue(HttpRequestMessage request, T notificationObject);
        HttpResponseMessage ReadFromQueue(HttpRequestMessage request);

        HttpResponseMessage SendSMSFromQueue(HttpRequestMessage request, T smsObject);
        HttpResponseMessage SendListFromQueue(HttpRequestMessage request, List<T> notificationObject);
    }
}

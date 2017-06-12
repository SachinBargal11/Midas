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
        HttpResponseMessage AddSMSToQueue(HttpRequestMessage request, T smsObject);
        HttpResponseMessage ReadSMSFromQueue(HttpRequestMessage request);

        HttpResponseMessage SendSMSFromQueue(HttpRequestMessage request, T smsObject);
        HttpResponseMessage testSMS(HttpRequestMessage request, string test);
    }
}

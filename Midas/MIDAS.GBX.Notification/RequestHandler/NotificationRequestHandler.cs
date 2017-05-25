using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.Notification.RequestHandler
{
    public class NotificationRequestHandler<T> : IRequestHandler<T>
    {
        public HttpResponseMessage SendSMS(HttpRequestMessage request, T smsObject)
        {
            throw new NotImplementedException();
        }
    }
}
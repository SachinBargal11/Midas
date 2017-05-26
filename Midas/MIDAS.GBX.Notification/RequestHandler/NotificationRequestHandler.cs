using MIDAS.GBX.Notification.UtilityAccessManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace MIDAS.GBX.Notification.RequestHandler
{
    public class NotificationRequestHandler<T> : IRequestHandler<T>
    {
        private IUtilityAccessManager<T> utilityAccessManager;

        public NotificationRequestHandler()
        {
            utilityAccessManager = new UtilityAccessManager<T>();
        }

        public HttpResponseMessage SendSMS(HttpRequestMessage request, T smsObject)
        {
            var objResult = utilityAccessManager.SendSMS(smsObject);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }

        public HttpResponseMessage SendMultipleSMS(HttpRequestMessage request, T multipleSMSObject)
        {
            var objResult = utilityAccessManager.SendMultipleSMS(multipleSMSObject);

            try
            {
                var res = (object)objResult;
                if (res != null)
                    return request.CreateResponse(HttpStatusCode.Created, res);
                else
                    return request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception ex)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
            }
        }
    }
}
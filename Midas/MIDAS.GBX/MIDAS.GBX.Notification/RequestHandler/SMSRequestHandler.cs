using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using MIDAS.GBX.DataRepository;

namespace MIDAS.GBX.Notification.RequestHandler
{
    public class SMSRequestHandler<T> : IRequestHandler<T>
    {
        private IGbNotificationManager<T> notificationManager;

        public SMSRequestHandler()
        {
            notificationManager = new GbNotificationManager<T>();
        }

        public HttpResponseMessage AddSMSToQueue(HttpRequestMessage request, T smsObject)
        {
            var objResult = notificationManager.AddSMSToQueue(smsObject);

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

        public HttpResponseMessage ReadSMSFromQueue(HttpRequestMessage request)
        {
            var objResult = notificationManager.ReadSMSFromQueue();

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

        public HttpResponseMessage SendSMSFromQueue(HttpRequestMessage request, T smsObject)
        {
            var objResult = notificationManager.SendSMSFromQueue(smsObject);

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

        public HttpResponseMessage SendSMSListFromQueue(HttpRequestMessage request, List<T> smsObject)
        {
            var objResult = notificationManager.SendSMSListFromQueue(smsObject);

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
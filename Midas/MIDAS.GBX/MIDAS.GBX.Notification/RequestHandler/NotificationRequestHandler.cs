using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using MIDAS.GBX.DataRepository;

namespace MIDAS.GBX.Notification.RequestHandler
{
    public class NotificationRequestHandler<T> : IRequestHandler<T>
    {
        private IGbNotificationManager<T> notificationManager;

        public NotificationRequestHandler()
        {
            notificationManager = new GbNotificationManager<T>();
        }

        public HttpResponseMessage AddToQueue(HttpRequestMessage request, T notificationObject)
        {
            var objResult = notificationManager.AddToQueue(notificationObject);

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

        public HttpResponseMessage ReadFromQueue(HttpRequestMessage request)
        {
            var objResult = notificationManager.ReadFromQueue();

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

        //public HttpResponseMessage SendSMSFromQueue(HttpRequestMessage request, T smsObject)
        //{
        //    var objResult = notificationManager.SendSMSFromQueue(smsObject);

        //    try
        //    {
        //        var res = (object)objResult;
        //        if (res != null)
        //            return request.CreateResponse(HttpStatusCode.Created, res);
        //        else
        //            return request.CreateResponse(HttpStatusCode.NotFound, res);
        //    }
        //    catch (Exception ex)
        //    {
        //        return request.CreateResponse(HttpStatusCode.BadRequest, objResult);
        //    }
        //}

        public HttpResponseMessage SendListFromQueue(HttpRequestMessage request, List<T> notificationObject)
        {
            var objResult = notificationManager.SendListFromQueue(notificationObject);

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
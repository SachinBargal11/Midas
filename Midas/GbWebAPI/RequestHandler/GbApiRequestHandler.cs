using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.DataAccessManager;
using Midas.Common;
using Midas.GreenBill.EntityRepository;
using Newtonsoft.Json.Linq;

namespace Midas.GreenBill.Api
{
    public class GbApiRequestHandler<T> : IRequestHandler<T>
    {
        private IGbDataAccessManager<T> dataAccessManager;

        public GbApiRequestHandler()
        {
            dataAccessManager = new GbDataAccessManager<T>();
        }

        public HttpResponseMessage CreateGbObject(HttpRequestMessage request, JObject gbObject)
        {
            Object ID = dataAccessManager.Save(gbObject);

            return request.CreateResponse(HttpStatusCode.OK, ID);
        }
        

        private static string GetCurrentUserFromContext(HttpRequestMessage request)
        {
            //use the usertoken to determine the  user
            return "";
        }
        public HttpResponseMessage GetObject(HttpRequestMessage request, T gbObject)
        {
            
            T ID = dataAccessManager.Get(gbObject);

            return request.CreateResponse<T>(HttpStatusCode.OK, ID);
        }

        public HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject)
        {
            int ID = dataAccessManager.Delete(gbObject);

            if (ID > 0)
            {
                var res = (GbObject)(object)gbObject;
                res.ID = ID;
                return request.CreateResponse<T>(HttpStatusCode.OK, (T)(object)res);
            }
            else
            {
                return request.CreateResponse<T>(HttpStatusCode.NotFound, gbObject);
            }
        }

        public HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request,JObject data)
        {
            Object objResult = dataAccessManager.Get(data);

            return request.CreateResponse(HttpStatusCode.OK, objResult);
        }

        public HttpResponseMessage SignUp(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.Signup(data);

            return request.CreateResponse(HttpStatusCode.OK, objResult);
        }

        public HttpResponseMessage Login(HttpRequestMessage request, JObject data)
        {
            Object objResult = dataAccessManager.Login(data);

            return request.CreateResponse(HttpStatusCode.OK, objResult);
        }
    }
}
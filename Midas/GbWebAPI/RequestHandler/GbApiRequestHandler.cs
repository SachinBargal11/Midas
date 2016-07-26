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

        public HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject)
        {
            int ID= dataAccessManager.Save(gbObject);

            if(ID>0)
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
            int ID = dataAccessManager.Save(gbObject);

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

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject, List<EntitySearchParameter> filter)
        {
            List<T> ID = dataAccessManager.Get(gbObject, filter);

            return request.CreateResponse(HttpStatusCode.OK, ID);
        }

        public HttpResponseMessage SignUp(HttpRequestMessage request, JObject data)
        {
            Object ID = dataAccessManager.Signup(data);

            return request.CreateResponse(HttpStatusCode.OK, ID);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.DataAccessManager;
using Midas.Common;
<<<<<<< HEAD
using Midas.GreenBill.EntityRepository;
=======
>>>>>>> master

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
<<<<<<< HEAD
            int ID= dataAccessManager.Save(gbObject);

            if(ID>0)
            {
                return request.CreateResponse<T>(HttpStatusCode.OK, gbObject);
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
        public HttpResponseMessage GetGbObjectById(HttpRequestMessage request, T gbObject, int id)
        {
            
            T ID = dataAccessManager.Get(gbObject, id);

            return request.CreateResponse<T>(HttpStatusCode.OK, ID);
        }

        public HttpResponseMessage GetGbObjectByName(HttpRequestMessage request, T gbObject, string name)
        {
            List<T> objData = dataAccessManager.Get(gbObject, name);
            return request.CreateResponse<List<T>>(HttpStatusCode.OK, objData);
        }

        public HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject, int id)
=======
            throw new NotImplementedException();
        }

        public HttpResponseMessage DeleteGbObject(HttpRequestMessage request, int id)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetGbObjectById(HttpRequestMessage request, int id)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetGbObjectByName(HttpRequestMessage request, string name)
>>>>>>> master
        {
            throw new NotImplementedException();
        }

<<<<<<< HEAD
        public HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject, string name)
=======
        public HttpResponseMessage GetGbObjects(HttpRequestMessage request)
>>>>>>> master
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject)
        {
            throw new NotImplementedException();
        }

<<<<<<< HEAD
        public HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject, List<EntitySearchParameter> filter)
        {
            List<T> ID = dataAccessManager.Get(gbObject, filter);

            return request.CreateResponse(HttpStatusCode.OK, ID);
=======
        public HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, string name)
        {
            throw new NotImplementedException();
        }

        private static string GetCurrentUserFromContext(HttpRequestMessage request)
        {
            //use the usertoken to determine the  user
            return "";
>>>>>>> master
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.DataAccessManager;
using Midas.Common;

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
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetGbObjects(HttpRequestMessage request)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, string name)
        {
            throw new NotImplementedException();
        }

        private static string GetCurrentUserFromContext(HttpRequestMessage request)
        {
            //use the usertoken to determine the  user
            return "";
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.DataAccessManager;
using Midas.Common;
using Midas.GreenBill.EntityRepository;

namespace Midas.GreenBill.Api
{
    public class GBUserRequestHandler<T> : IUserRequestHandler<T>
    {
        private IGBUserDataAcessManager<T> dataAccessManager;

        public GBUserRequestHandler()
        {
            dataAccessManager = new GBUserDataAcessManager<T>();
        }

        public HttpResponseMessage Login(HttpRequestMessage request, T gbObject, string userName, string Password)
        {
            T ID = dataAccessManager.Login(gbObject, userName,Password);
            if (ID!=null)
            {
                return request.CreateResponse<T>(HttpStatusCode.OK, ID);
            }
            else
            {
                return request.CreateResponse<T>(HttpStatusCode.NotFound, gbObject);
            }
        }
    }
}
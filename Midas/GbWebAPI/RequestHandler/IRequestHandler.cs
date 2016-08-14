using System;
using System.Collections.Generic;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;
using Newtonsoft.Json.Linq;

namespace Midas.GreenBill.Api
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage GetGbObjects(HttpRequestMessage request,JObject data);
        HttpResponseMessage GetObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, JObject gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SignUp(HttpRequestMessage request, JObject data);
        HttpResponseMessage Login(HttpRequestMessage request, JObject data);

    }
}

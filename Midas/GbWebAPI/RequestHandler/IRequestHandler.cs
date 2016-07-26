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
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject, List<EntitySearchParameter> filter);
        HttpResponseMessage GetObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SignUp(HttpRequestMessage request, JObject data);

    }
}

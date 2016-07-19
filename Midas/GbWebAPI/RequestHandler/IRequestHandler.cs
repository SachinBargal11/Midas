using System;
using System.Collections.Generic;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;

namespace Midas.GreenBill.Api
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject, List<EntitySearchParameter> filter);
        HttpResponseMessage GetGbObjectById(HttpRequestMessage request, T gbObject, int id);
        HttpResponseMessage GetGbObjectByName(HttpRequestMessage request, T gbObject, string name);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject, int id);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject, string name);

    }
}

using System;
using System.Collections.Generic;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
<<<<<<< HEAD
using Midas.GreenBill.EntityRepository;
=======
>>>>>>> master

namespace Midas.GreenBill.Api
{
    public interface IRequestHandler<T> 
    {
<<<<<<< HEAD
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject, List<EntitySearchParameter> filter);
        HttpResponseMessage GetGbObjectById(HttpRequestMessage request, T gbObject, int id);
        HttpResponseMessage GetGbObjectByName(HttpRequestMessage request, T gbObject, string name);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject, int id);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject, string name);
=======
        HttpResponseMessage GetGbObjects(HttpRequestMessage request);
        HttpResponseMessage GetGbObjectById(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjectByName(HttpRequestMessage request, string name);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, int id);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, string name);
>>>>>>> master

    }
}

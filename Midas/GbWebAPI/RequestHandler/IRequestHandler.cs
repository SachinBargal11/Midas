using System;
using System.Collections.Generic;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;

namespace Midas.GreenBill.Api
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage GetGbObjects(HttpRequestMessage request);
        HttpResponseMessage GetGbObjectById(HttpRequestMessage request, int id);
        HttpResponseMessage GetGbObjectByName(HttpRequestMessage request, string name);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, int id);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, string name);

    }
}

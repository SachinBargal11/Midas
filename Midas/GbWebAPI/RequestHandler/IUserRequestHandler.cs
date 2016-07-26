using System;
using System.Collections.Generic;
using System.Net.Http;
using Midas.GreenBill.BusinessObject;
using Midas.GreenBill.EntityRepository;

namespace Midas.GreenBill.Api
{
    public interface IUserRequestHandler<T>
    {
        HttpResponseMessage Login(HttpRequestMessage request, T gbObject, string userName,string Password);

    }
}

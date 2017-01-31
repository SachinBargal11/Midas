using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace MIDAS.GBX.WebAPI
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SignUp(HttpRequestMessage request, T gbObject);
        HttpResponseMessage Login(HttpRequestMessage request, T gbObject);

        HttpResponseMessage GenerateToken(HttpRequestMessage request,int userId);
        HttpResponseMessage ValidateToken(HttpRequestMessage request,string tokenId);
        HttpResponseMessage Kill(HttpRequestMessage requeststring,int tokenId);
        HttpResponseMessage DeleteByUserId(HttpRequestMessage request,int userId);

        HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject);


        HttpResponseMessage GetObjects(HttpRequestMessage request);
        HttpResponseMessage GetObjects(HttpRequestMessage request, string param1);
        HttpResponseMessage CreateGbObjectPatient(HttpRequestMessage request, T gbObject);
    }
}

using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace MIDAS.GBX.WebAPI
{
    public interface IRequestHandler<T> 
    {
        HttpResponseMessage ValidateInvitation(HttpRequestMessage request, JObject data);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request,JObject data);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, JObject gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage DeleteGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateUniqueName(HttpRequestMessage request, T gbObject);
        HttpResponseMessage SignUp(HttpRequestMessage request, JObject data);
        HttpResponseMessage Login(HttpRequestMessage request, JObject data);

        HttpResponseMessage GenerateToken(HttpRequestMessage request,int userId);
        HttpResponseMessage ValidateToken(HttpRequestMessage request,string tokenId);
        HttpResponseMessage Kill(HttpRequestMessage requeststring,int tokenId);
        HttpResponseMessage DeleteByUserId(HttpRequestMessage request,int userId);

        HttpResponseMessage ValidateOTP(HttpRequestMessage request, JObject data);
        HttpResponseMessage RegenerateOTP(HttpRequestMessage request, JObject data);
        HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, JObject data);
        HttpResponseMessage ValidatePassword(HttpRequestMessage request, JObject data);

    }
}

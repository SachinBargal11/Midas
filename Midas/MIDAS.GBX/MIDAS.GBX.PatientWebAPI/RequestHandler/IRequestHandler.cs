using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace MIDAS.GBX.PatientWebAPI.RequestHandler
{
    public interface IRequestHandler<T>
    {
        HttpResponseMessage Login(HttpRequestMessage request, T gbObject);
        HttpResponseMessage RegenerateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateOTP(HttpRequestMessage request, T gbObject);
        HttpResponseMessage CreateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObject(HttpRequestMessage request, int id);
        HttpResponseMessage ValidatePassword(HttpRequestMessage request, T gbObject);
        HttpResponseMessage ValidateInvitation(HttpRequestMessage request, T gbObject);
        HttpResponseMessage UpdateGbObject(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GeneratePasswordLink(HttpRequestMessage request, T gbObject);
        HttpResponseMessage GetObjects(HttpRequestMessage request);
        HttpResponseMessage GetObjects(HttpRequestMessage request, string param1);
        HttpResponseMessage GetGbObjects(HttpRequestMessage request, int id);
        HttpResponseMessage ResetPassword(HttpRequestMessage request, T gbObject);
    }
}

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
    }
}

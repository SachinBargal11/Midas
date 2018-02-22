using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IdentityModel.Client;
using CAIdentityServer.Service;

namespace CAIdentityServer.Controllers
{
    public class TokenController : ApiController
    {
        [Route("Token/GetToken")]
        public TokenResponse GetToken(string clientid, string clientsecret, string username, string password)
        {
            string tokenEndPointUrl = Convert.ToString(System.Web.Configuration.WebConfigurationManager.AppSettings.Get("TokenEndpointUrl"));

            TokenClient _tokenClient = new TokenClient(
                tokenEndPointUrl,
                clientid,
                clientsecret);

            ClientScopeService service = new ClientScopeService();
            string scope = service.GetClientScopes(clientid);
            var response = _tokenClient.RequestResourceOwnerPasswordAsync(username, password, scope).Result;

            return response;
        }
    }
}

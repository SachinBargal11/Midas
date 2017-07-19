using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using Sample;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;

namespace SampleAspNetWebApi.Controllers
{
    public class TokenController : ApiController
    {
        
        TokenClient _tokenClient;
        [Route("GetToken")]
        public TokenResponse Get(string username, string password)
        {

            _tokenClient = new TokenClient(
                Sample.Constants.TokenEndpoint,
                "MidasAPIUser",
                "secret");

            var response = RequestToken(username, password);

            var apiResponse = CallService(response.AccessToken);

            return response;
        }

        private TokenResponse RequestToken(string username, string password)
        {
            return _tokenClient.RequestResourceOwnerPasswordAsync(username, password, "email offline_access openid profile roles SampleWebAPI").Result;
        }

        private JArray CallService(string token)
        {
            var baseAddress = Constants.AspNetWebApiSampleApi;

            var client = new HttpClient
            {
                BaseAddress = new Uri(baseAddress)
            };

            client.SetBearerToken(token);
            var response = JArray.Parse(client.GetStringAsync("identity").Result);
            return response;
        }
    }
}
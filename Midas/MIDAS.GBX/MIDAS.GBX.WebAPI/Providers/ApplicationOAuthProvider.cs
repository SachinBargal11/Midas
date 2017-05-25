using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using MIDAS.GBX.WebAPI.Models;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        MIDAS.GBX.DataRepository.DataAccessManager dataAccessManager;
        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }
            dataAccessManager = new DataRepository.DataAccessManager();
            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            if(string.IsNullOrEmpty(context.UserName))
            {
                context.SetError("invalid_grant", "Provided username and password is incorrect");
                return;
            }
            if (string.IsNullOrEmpty(context.Password))
            {
                context.SetError("invalid_grant", "Provided username and password is incorrect");
                return;
            }
            User user = new User { UserName = context.UserName, Password = context.Password,forceLogin=true };

            var res = dataAccessManager.Login2(user);
            if (res == null)
            {
                context.SetError("invalid_grant", "Provided username and password is incorrect");
                return;
            }
            try
            {
                var res_ = (User)(object)res;
                identity.AddClaim(new Claim("userName", context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Name, res_.FirstName));
                identity.AddClaim(new Claim("userId", res_.ID.ToString()));
                identity.AddClaim(new Claim("creationDate", DateTime.UtcNow.ToString()));

                context.Validated(identity);
            }
            catch
            {
                context.SetError("invalid_grant", "Provided username and password is incorrect");
                return;
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated(); // 
        }



        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
    }
}
using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer3.Core.Models;
using System.Security.Claims;
using IdentityServer3.Core.Services;
using Microsoft.Owin;
//using UserManager.Model;
//using UserManager.Contract;
using IdentityServer3.Core;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;

namespace CAIdentityServer.Service
{
    public class IndentityUserService : UserServiceBase
    {
        OwinContext ctx;
        
        public IndentityUserService(OwinEnvironmentService owinEnv)
        {
            ctx = new OwinContext(owinEnv.Environment);
        }

        public override Task PreAuthenticateAsync(PreAuthenticationContext context)
        {
            var id = ctx.Request.Query.Get("signin");
            context.AuthenticateResult = new AuthenticateResult("~/custom/login?id=" + id, (IEnumerable<Claim>)null);
            return Task.FromResult(0);
        }

        public override async Task AuthenticateLocalAsync(LocalAuthenticationContext ctx)
        {
            var username = ctx.UserName;
            var password = ctx.Password;

            if (ctx.SignInMessage.ClientId == null)
            {
                string baseUrl = Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["IdentityServerBaseUrl"]);
                string identityServerDefaultClientName = Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["IdentityServerDefaultClientName"]);

                if (ctx.SignInMessage.ReturnUrl.StartsWith(baseUrl))
                {
                    ctx.SignInMessage.ClientId = Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["IdentityServerDefaultClientName"]);
                }
            }

            ctx.AuthenticateResult = null;
            Models.IdentityUser user = null;
            ClientScopeService scopeService = new ClientScopeService();

            string userStoreServiceURL = scopeService.GetClientUserStoreServiceURL(ctx.SignInMessage.ClientId);

            //if in debug mode trust all the local certificates
            #if DEBUG
            ServicePointManager.ServerCertificateValidationCallback = 
                delegate (object s, 
                X509Certificate certificate, 
                X509Chain chain, 
                SslPolicyErrors sslPolicyErrors)
                {
                    return true;
                };
            #endif
            using (var client = new HttpClient())
            {
                //Passing service base url  
                client.BaseAddress = new Uri(userStoreServiceURL);

                client.DefaultRequestHeaders.Clear();
                //Define request data format  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetUser using HttpClient  
                HttpResponseMessage Res = await client.GetAsync("core/UserStoreService/GetUser?userName=" + ctx.UserName + "&password=" + ctx.Password);

                //Checking the response is successful or not which is sent using HttpClient  
                if (Res.IsSuccessStatusCode)
                {
                    //Storing the response details recieved from web api   
                    var userResponse = Res.Content.ReadAsStringAsync().Result;

                    //Deserializing the response recieved from web api and storing into the Employee list  
                    user = JsonConvert.DeserializeObject<Models.IdentityUser>(userResponse);
                }
            }

            if (user != null)
            {
                var result = await PostAuthenticateLocalAsync(user, ctx.SignInMessage);
                if (result == null)
                {

                    var claims = GetUserClaims(user);
                    result = new AuthenticateResult(user.Id.ToString(), user.DisplayName, claims);
                }

                ctx.AuthenticateResult = result;
            }
            else
            {
                ctx.AuthenticateResult = new AuthenticateResult("User cannot be authenticated due to incorrect credentials");
            }

        }

        protected async Task<AuthenticateResult> PostAuthenticateLocalAsync(Models.IdentityUser user, SignInMessage message)
        {
            ClientScopeService clientScopeService = new ClientScopeService();
            bool result = false;

            bool isTwoFactorAuthentication = clientScopeService.IsTwoFactorAuthentication(message.ClientId);

            if (isTwoFactorAuthentication && (user.TwoFactorEmailAuthEnabled || user.TwoFactorSMSAuthEnabled))
            {
                string userStoreServiceURL = clientScopeService.GetClientUserStoreServiceURL(message.ClientId);

                using (var client = new HttpClient())
                {
                    //Passing service base url  
                    client.BaseAddress = new Uri(userStoreServiceURL);

                    client.DefaultRequestHeaders.Clear();
                    //Define request data format  
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    //Sending request to find web api REST service resource GetUser using HttpClient  
                    HttpResponseMessage Res = await client.GetAsync("/GenerateAndSendOTP?userID=" + user.Id);

                    //Checking the response is successful or not which is sent using HttpClient  
                    if (Res.IsSuccessStatusCode)
                    {
                        //Storing the response details recieved from web api   
                        var userResponse = Res.Content.ReadAsStringAsync().Result;

                        //Deserializing the response recieved from web api and storing into the Employee list  
                        result = JsonConvert.DeserializeObject<bool>(userResponse);
                    }
                }

                if (!result)
                {
                    return new AuthenticateResult("Due to an error, OTP code could not be sent. Please try again. If this problem persists, please contact seystem administrator.");
                }

                var claims = GetUserClaims(user);
                return new AuthenticateResult("~/custom/2fa?id=" + ctx.Request.Query.Get("id"), user.Subject, user.DisplayName, claims);
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> VerifyTwoFactorTokenAsync(string userId, string code, SignInMessage message)
        {
            ClientScopeService clientScopeService = new ClientScopeService();
            string userStoreServiceURL = clientScopeService.GetClientUserStoreServiceURL(message.ClientId);
            bool result = false;
            
            using (var client = new HttpClient())
            {
                //Passing service base url  
                client.BaseAddress = new Uri(userStoreServiceURL);

                client.DefaultRequestHeaders.Clear();
                //Define request data format  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetUser using HttpClient  
                HttpResponseMessage Res = await client.GetAsync("/VerifyOTP?userID=" + userId + "&otpCode=" + code);

                //Checking the response is successful or not which is sent using HttpClient  
                if (Res.IsSuccessStatusCode)
                {
                    //Storing the response details recieved from web api   
                    var userResponse = Res.Content.ReadAsStringAsync().Result;

                    //Deserializing the response recieved from web api and storing into the Employee list  
                    result = JsonConvert.DeserializeObject<bool>(userResponse);
                }
            }
            return result;
        }

        public override async Task GetProfileDataAsync(ProfileDataRequestContext ctx)
        {
            var subject = ctx.Subject;
            var requestedClaimTypes = ctx.RequestedClaimTypes;
            Models.IdentityUser user = null;

            if (subject == null) throw new ArgumentNullException("subject");

            int userID = Convert.ToInt32(subject.GetSubjectId());

            ClientScopeService clientScopeService = new ClientScopeService();
            string userStoreServiceURL = clientScopeService.GetClientUserStoreServiceURL(ctx.Client.ClientId);

            using (var client = new HttpClient())
            {
                //Passing service base url  
                client.BaseAddress = new Uri(userStoreServiceURL);

                client.DefaultRequestHeaders.Clear();
                //Define request data format  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetUser using HttpClient  
                HttpResponseMessage Res = await client.GetAsync("/GetUserProfileData?userID=" + userID);

                //Checking the response is successful or not which is sent using HttpClient  
                if (Res.IsSuccessStatusCode)
                {
                    //Storing the response details recieved from web api   
                    var userResponse = Res.Content.ReadAsStringAsync().Result;

                    //Deserializing the response recieved from web api and storing into the Employee list  
                    user = JsonConvert.DeserializeObject<Models.IdentityUser>(userResponse);
                }
            }

            if (user == null)
            {
                throw new ArgumentException("Invalid subject identifier");
            }

            var claims = GetUserClaims(user);
            if (requestedClaimTypes != null && requestedClaimTypes.Any())
            {
                claims = claims.Where(x => requestedClaimTypes.Contains(x.Type));
            }

            ctx.IssuedClaims = claims;
        }

        private IEnumerable<Claim> GetUserClaims(Models.IdentityUser user)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(Constants.ClaimTypes.Name, user.DisplayName));
            claims.Add(new Claim(Constants.ClaimTypes.Email, user.Username));
            claims.Add(new Claim(Constants.ClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
            //Add Role Claims
            foreach (Models.IdentityRole role in user.Roles)
            {
                claims.Add(new Claim(Constants.ClaimTypes.Role, role.Name));
            }

            return claims;
        }

        //private IUserStoreService GetUserStoreService(string clientid)
        //{
        //    IUserStoreService userStoreService;

        //    if (clientid == "Midas" || clientid == "MidasAPIUser")
        //    {
        //        userStoreService = new UserManager.Service.MidasUserStoreService();
        //    }
        //    else
        //    {
        //        userStoreService = new UserManager.Service.MidasUserStoreService();
        //    }

        //    return userStoreService;
        //}
    }
}

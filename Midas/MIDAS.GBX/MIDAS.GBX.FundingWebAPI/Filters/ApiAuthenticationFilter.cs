using System.Threading;
using System.Web.Http.Controllers;
using MIDAS.GBX.WebAPI;
using MIDAS.GBX.BusinessObjects;
using BO = MIDAS.GBX.BusinessObjects;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace MIDAS.GBX.FundingWebAPI.Filters
{
    /// <summary>
    /// Custom Authentication Filter Extending basic Authentication
    /// </summary>
    public class ApiAuthenticationFilter : GenericAuthenticationFilter
    {
        private IRequestHandler<User> requestHandler;
        /// <summary>
        /// Default Authentication Constructor
        /// </summary>
        public ApiAuthenticationFilter()
        {
            requestHandler = new GbApiRequestHandler<User>();
        }

        /// <summary>
        /// AuthenticationFilter constructor with isActive parameter
        /// </summary>
        /// <param name="isActive"></param>
        public ApiAuthenticationFilter(bool isActive)
            : base(isActive)
        {
        }

        /// <summary>
        /// Protected overriden method for authorizing user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="actionContext"></param>
        /// <returns></returns>
        protected override bool OnAuthorizeUser(string username, string password, HttpActionContext actionContext)
        {
            if (requestHandler != null)
            {
                dynamic jsonObject = new JObject();
                jsonObject.userName = username;
                jsonObject.password = password;

                var userId = requestHandler.Login(null,jsonObject);
                if (userId>0)
                {
                    var basicAuthenticationIdentity = Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;
                    if (basicAuthenticationIdentity != null)
                        basicAuthenticationIdentity.UserId = userId;
                    return true;
                }
            }
            return false;
        }
    }
}
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
using UserManager.Model;
using UserManager.Contract;
using IdentityServer3.Core;

namespace CAIdentityServer.Service
{
    public class MidasUserService : UserServiceBase
    {
        OwinContext ctx;
        
        public MidasUserService(OwinEnvironmentService owinEnv)
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
            var message = ctx.SignInMessage;

            ctx.AuthenticateResult = null;

            IUserStoreService service = GetUserStoreService(message.ClientId);

            var user = service.GetUser(ctx.UserName, ctx.Password);

            if (user != null)
            {
                var result = await PostAuthenticateLocalAsync(user, message);
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

        protected async Task<AuthenticateResult> PostAuthenticateLocalAsync(User user, SignInMessage message)
        {
            bool twoFactorAuthEnabled = UserManager.Common.Utility.GetConfigValue("TwoFactorAuthenticationEnabled") == "true" ? true : false;

            if (twoFactorAuthEnabled && (user.TwoFactorEmailAuthEnabled || user.TwoFactorSMSAuthEnabled))
            {
                IUserStoreService service = GetUserStoreService(message.ClientId);

                var result = service.GenerateAndSendOTP(user.Id);

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
            IUserStoreService service = GetUserStoreService(message.ClientId);

            var result = service.VerifyOTP(Convert.ToInt32(userId), Convert.ToInt32(code));
            return result;
        }

        public override async Task GetProfileDataAsync(ProfileDataRequestContext ctx)
        {
            var subject = ctx.Subject;
            var requestedClaimTypes = ctx.RequestedClaimTypes;

            if (subject == null) throw new ArgumentNullException("subject");

            int userID = Convert.ToInt32(subject.GetSubjectId());

            IUserStoreService service = GetUserStoreService(ctx.Client.ClientId);

            var user = service.GetUserProfileData(userID);

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

        private IEnumerable<Claim> GetUserClaims(User user)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(Constants.ClaimTypes.Name, user.DisplayName));
            claims.Add(new Claim(Constants.ClaimTypes.Email, user.Username));
            claims.Add(new Claim(Constants.ClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
            //Add Role Claims
            foreach (Role role in user.Roles)
            {
                claims.Add(new Claim(Constants.ClaimTypes.Role, role.Name));
            }

            return claims;
        }

        private IUserStoreService GetUserStoreService(string clientid)
        {
            IUserStoreService userStoreService;

            if (clientid == "Midas" || clientid == "MidasAPIUser")
            {
                userStoreService = new UserManager.Service.MidasUserStoreService();
            }
            else
            {
                userStoreService = new UserManager.Service.MidasUserStoreService();
            }

            return userStoreService;
        }
    }
}

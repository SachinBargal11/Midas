using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using IdentityServer3.Core.Extensions;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.Default;
using IdentityServer3.Core;
using UserManager;
using UserManager.Model;

namespace Host.Configuration.Services
{
    public class CustomUserService : UserServiceBase
    {
        public override Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            //var user = Users.SingleOrDefault(x => x.Username == context.UserName && x.Password == context.Password);
            MidasUserService userService = new MidasUserService();
            var user = userService.GetUser(context.UserName, context.Password);
            if (user.Subject != null)
            {
                context.AuthenticateResult = new AuthenticateResult(user.Subject, user.Username);
            }

            return Task.FromResult(0);
        }

        public override Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            // issue the claims for the user
            //var user = Users.SingleOrDefault(x => x.Subject == context.Subject.GetSubjectId());

            MidasUserService userService = new MidasUserService();
            var user = userService.GetUserProfileData(Convert.ToInt32(context.Subject.GetSubjectId()));
            user.Claims = GetUserClaims(user);

            if (user != null)
            {
                context.IssuedClaims = user.Claims.Where(x => context.RequestedClaimTypes.Contains(x.Type));
            }

            return Task.FromResult(0);
        }

        private IEnumerable<Claim> GetUserClaims(MidasUser user)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(Constants.ClaimTypes.Name, user.FirstName + ' ' + user.LastName));
            claims.Add(new Claim(Constants.ClaimTypes.Email, user.Username));
            claims.Add(new Claim(Constants.ClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean));
            foreach(Role role in user.Roles)
            {
                claims.Add(new Claim(Constants.ClaimTypes.Role, role.Name));
            }

            return claims;
        }
    }
}

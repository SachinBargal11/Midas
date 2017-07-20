using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IdentityServer3.Core.Extensions;
using System.Threading.Tasks;
using IdentityServer3.Core.Models;
using CAIdentityServer.Service;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Configuration.Hosting;
using IdentityServer3.Core;
using System.Security.Claims;
using Microsoft.Owin;
using IdentityServer3.Core.Configuration;
using CAIdentityServer.Models;

namespace CAIdentityServer.Controllers
{
    public class LoginController : Controller
    {
        private IdentityServerOptions options = new IdentityServerOptions();
         
        [Route("core/custom/login")]
        public async Task<ActionResult> Index(string id)
        {
            var ctx = Request.GetOwinContext();
            var user = ctx.Environment.GetIdentityServerPartialLoginAsync();
            if (user == null)
            {
                return View("Error");
            }
            return View();
        }

        [Route("core/custom/login")]
        [HttpPost]
        public async Task<ActionResult> Index(string id, LoginCredential model)
        {
            var context = Request.GetOwinContext();
            var env = Request.GetOwinContext().Environment;
            var signInMessage = env.GetSignInMessage(id);
            
            var authenticationContext = new LocalAuthenticationContext
            {
                UserName = model.Username.Trim(),
                Password = model.Password.Trim(),
                SignInMessage = signInMessage
            };

            OwinEnvironmentService owin = new OwinEnvironmentService(env);
            MidasUserService userService = new MidasUserService(owin);
            await userService.AuthenticateLocalAsync(authenticationContext);

            var authResult = authenticationContext.AuthenticateResult;
            if (authResult == null || (authResult.ErrorMessage != null && authResult.ErrorMessage != string.Empty))
            {
                string errorMessage = null;
                if (authResult != null && authResult.ErrorMessage != string.Empty)
                {
                    errorMessage = authResult.ErrorMessage;
                }
                else
                {
                    errorMessage = "Unable to process you authentication request due an error";
                }
                ModelState.AddModelError("AuthError", errorMessage);
                return View();
            }
            else
            {
                ClearAuthenticationCookiesForNewSignIn(context, authResult);
                IssueAuthenticationCookie(context, id, authResult, model.RememberMe);

                //var redirectUrl = GetRedirectUrl(context, signInMessage, authResult);
                string redirectUrl;
                if (authResult.IsPartialSignIn)
                {
                    var path = authResult.PartialSignInRedirectPath;
                    if (path.StartsWith("~/"))
                    {
                        path = path.Substring(2);
                        path = context.Environment.GetIdentityServerBaseUrl() + path;
                    }

                    var host = new Uri(context.Environment.GetIdentityServerHost());
                    //return new Uri(host, path);
                    redirectUrl = path;
                }
                else
                {
                    redirectUrl = signInMessage.ReturnUrl;
                }

                return Redirect(redirectUrl);
            }

        }

        private void ClearAuthenticationCookiesForNewSignIn(IOwinContext context, AuthenticateResult authResult)
        {
            // on a partial sign-in, preserve the existing primary sign-in
            if (!authResult.IsPartialSignIn)
            {
                context.Authentication.SignOut(Constants.PrimaryAuthenticationType);
            }
            context.Authentication.SignOut(
                Constants.ExternalAuthenticationType,
                Constants.PartialSignInAuthenticationType);
        }

        private void IssueAuthenticationCookie(IOwinContext context, string signInMessageId, AuthenticateResult authResult, bool rememberMe)
        {
            if (authResult == null) throw new ArgumentNullException("authResult");

            var props = new Microsoft.Owin.Security.AuthenticationProperties();

            var id = authResult.User.Identities.First();
            if (authResult.IsPartialSignIn)
            {
                // add claim so partial redirect can return here to continue login
                // we need a random ID to resume, and this will be the query string
                // to match a claim added. the claim added will be the original 
                // signIn ID. 
                var resumeId = Guid.NewGuid().ToString();
                var resumeLoginUrl = context.Environment.GetIdentityServerBaseUrl() + Constants.RoutePaths.ResumeLoginFromRedirect + "?resume=" + resumeId;
                var resumeLoginClaim = new Claim(Constants.ClaimTypes.PartialLoginReturnUrl, resumeLoginUrl);
                id.AddClaim(resumeLoginClaim);
                id.AddClaim(new Claim(String.Format(Constants.ClaimTypes.PartialLoginResumeId, resumeId), signInMessageId));

                // add url to start login process over again (which re-triggers preauthenticate)
                var restartUrl = context.Environment.GetIdentityServerBaseUrl() + "custom/login?signin=" + signInMessageId;
                
                id.AddClaim(new Claim(Constants.ClaimTypes.PartialLoginRestartUrl, restartUrl));
            }
            else
            {
                context.Environment.IssueLoginCookie(new IdentityServer3.Core.Models.AuthenticatedLogin
                {
                    Subject = authResult.User.Identity.GetSubjectId(),
                    Name = authResult.User.Identity.Name,
                    PersistentLogin = rememberMe,
                    Claims = id.Claims,
                });
            }

            if (!authResult.IsPartialSignIn)
            {
                // don't issue persistnt cookie if it's a partial signin
                if (rememberMe == true ||
                    (rememberMe != false && options.AuthenticationOptions.CookieOptions.IsPersistent))
                {
                    // only issue persistent cookie if user consents (rememberMe == true) or
                    // if server is configured to issue persistent cookies and user has not explicitly
                    // denied the rememberMe (false)
                    // if rememberMe is null, then user was not prompted for rememberMe
                    props.IsPersistent = true;
                    if (rememberMe == true)
                    {
                        var expires = DateTime.SpecifyKind(DateTimeOffset.UtcNow.DateTime, DateTimeKind.Utc).Add(options.AuthenticationOptions.CookieOptions.RememberMeDuration);
                        props.ExpiresUtc = new DateTimeOffset(expires);
                    }
                }
            }
            else
            {
                // if rememberme set, then store for later use once we need to issue login cookie
                props.Dictionary.Add(Constants.Authentication.PartialLoginRememberMe, rememberMe ? "true" : "false");
            }

            context.Authentication.SignIn(props, id);
        }
    }
}
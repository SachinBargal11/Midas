using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using IdentityServer3.Core.Extensions;
using System.Security.Claims;
using CAIdentityServer.Service;
using IdentityServer3.Core.Services;

namespace CAIdentityServer.Controllers
{
    public class TwoFactorController : Controller
    {
        [Route("core/custom/2fa")]
        public async Task<ActionResult> Index(string id)
        {
            var ctx = Request.GetOwinContext();
            var user = await ctx.Environment.GetIdentityServerPartialLoginAsync();
            if (user == null)
            {
                return View("Error");
            }

            return View("Index");
        }

        [Route("core/custom/2fa")]
        [HttpPost]
        public async Task<ActionResult> Index(string id, string code)
        {
            var ctx = Request.GetOwinContext();

            var user = await ctx.Environment.GetIdentityServerPartialLoginAsync();
            if (user == null)
            {
                return View("Error");
            }

            var subjectid = user.FindFirst("sub").Value;

            var context = Request.GetOwinContext();
            var env = Request.GetOwinContext().Environment;
            var signInMessage = env.GetSignInMessage(id);
            OwinEnvironmentService owin = new OwinEnvironmentService(env);
            IndentityUserService userService = new IndentityUserService(owin);

            if (!(await userService.VerifyTwoFactorTokenAsync(subjectid, code, signInMessage)))
            {
                ViewData["message"] = "Incorrect code";
                return View("Index");
            }

            var claims = user.Claims.Where(c => c.Type != "amr").ToList();
            claims.Add(new Claim("amr", "2fa"));
            await ctx.Environment.UpdatePartialLoginClaimsAsync(claims);

            var resumeUrl = await ctx.Environment.GetPartialLoginResumeUrlAsync();
            return Redirect(resumeUrl);
        }
    }
}
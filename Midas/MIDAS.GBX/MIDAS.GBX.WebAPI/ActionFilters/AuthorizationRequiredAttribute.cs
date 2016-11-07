using MIDAS.GBX.WebAPI;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace MIDAS.GBX.WebAPI.ActionFilters
{
    public class AuthorizationRequiredAttribute : ActionFilterAttribute
    {
        private const string Token = "Token";

        public override void OnActionExecuting(HttpActionContext filterContext)
        {

        }
    }
}
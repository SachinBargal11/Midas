using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Mvc;

namespace MIDAS.GBX.WebAPI
{
    public class MidasAuthorize : System.Web.Http.AuthorizeAttribute
    {
        public MidasAuthorize()
        {
            
        }
        
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {            
            List<string> roles = new List<string>();
            string controllerName = actionContext.ControllerContext.ControllerDescriptor.ControllerName;
            ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims.ToList().ForEach(p => roles = p.Type.ToUpper() == "ROLE" ? p.Value.Split(',').ToList<string>() : roles);                      
            if (roles.Any(p => System.Configuration.ConfigurationManager.AppSettings.Get("attorney").Split(',').ToList().Contains(p)))
                return true;
            else
                return false;
        }

    }
}
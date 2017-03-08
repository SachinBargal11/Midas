using MIDAS.GBX.DataAccessManager;
using MIDAS.GBX.DataRepository.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
        /*private DbSet<UserCompanyRole> _dbUserCompanyRole;
        private DbSet<User> _dbUser;
        private DBContextProvider dbContextProvider = new DBContextProvider();
        private MIDASGBXEntities context = null;

        public MidasAuthorize()
        {
            context = dbContextProvider.GetGbDBContext();
            _dbUser = context.Set<User>();
            _dbUserCompanyRole = context.Set<UserCompanyRole>();
        }
        
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {            
            List<string> roles = new List<string>();
            string controllerName = actionContext.ControllerContext.ControllerDescriptor.ControllerName;
            ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims.ToList().ForEach(p => roles = p.Type.ToUpper() == "ROLE" ? p.Value.Split(',').ToList<string>() : roles);

             _dbUser.Include("UserCompanyRoles").ToList();
            
            if (roles.Any(p => System.Configuration.ConfigurationManager.AppSettings.Get("attorney").Split(',').ToList().Contains(p)))
                return true;
            else
                return false;
        }*/
    }
}
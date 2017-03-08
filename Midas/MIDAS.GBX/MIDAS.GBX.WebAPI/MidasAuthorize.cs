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
        private DbSet<UserCompanyRole> _dbUserCompanyRole;
        private DbSet<UserApiRoleMapping> _dbUserRoleMapping;
        private DBContextProvider dbContextProvider = new DBContextProvider();
        private MIDASGBXEntities context = null;
        private List<string> roles = new List<string>();
        private IEnumerable<string> authorisedRolesDB = new List<string>();
        private string controllerName = string.Empty;
        private string actionName = string.Empty;
        private bool returnStatus = false;

        public MidasAuthorize()
        {
            context = dbContextProvider.GetGbDBContext();
            _dbUserRoleMapping = context.Set<UserApiRoleMapping>();
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {            
            controllerName = actionContext.ControllerContext.ControllerDescriptor.ControllerName.ToUpper();
            actionName = actionContext.ActionDescriptor.ActionName.ToUpper();

            ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims.ToList().ForEach(p => roles = p.Type.ToUpper() == "ROLE" ? p.Value.Split(',').ToList<string>() : roles);
            authorisedRolesDB = _dbUserRoleMapping.Where(p => p.API.ToUpper() == controllerName.ToUpper() && (p.METHODS.IndexOf(actionName) >= 0)).ToList()
                                        .Select(x => x.ROLES).ToList().Distinct<string>();

            if (roles.Any(p => authorisedRolesDB.Contains(p.ToUpper()))) return returnStatus = true;
            else return returnStatus = false;
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            if (!returnStatus) actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
        }
    }
}
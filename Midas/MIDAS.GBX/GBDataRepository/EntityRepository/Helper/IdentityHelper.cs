using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MIDAS.GBX.BusinessObjects;
using System.Net.Http.Headers;
using System.Configuration;
using System.Web;
using System.Security.Claims;
using System.Security;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    public class IdentityHelper
    {      
        public string Email
        {
            get
            {
                var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
                if(identity.Claims.Count()>0)
                {
                    var username = identity.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").FirstOrDefault().Value;
                    if (username != null)
                    {
                        return username;
                    }
                    return "m1@allfriendshub.tk";
                }              
                else
                {
                    return "m1@allfriendshub.tk";
                }
                            
            }        
        }

        public string DisplayName
        {
            get
            {
                var name= HttpContext.Current.User.Identity.Name;
                if(name ==null)
                {
                    name = "Adarsh b";
                }
               
                return name;
            }
        }

    }
}

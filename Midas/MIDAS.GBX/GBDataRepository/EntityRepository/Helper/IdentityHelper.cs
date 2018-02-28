using System.Linq;
using System.Web;
using System.Security.Claims;

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
                   return identity.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").FirstOrDefault().Value;
                   //return "m1@allfriendshub.tk";
                }
                else
                {
                    //return null;
                    return "m1@allfriendshub.tk";
                }

            }        
        }

        public string DisplayName
        {
            get
            {
                var name = HttpContext.Current.User.Identity.Name;

                // return name;

                 return "Abc";
            }
        }

    }
}

using System.Web;
using System.Web.Mvc;

namespace MIDAS.GBX.AttorneyWebAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

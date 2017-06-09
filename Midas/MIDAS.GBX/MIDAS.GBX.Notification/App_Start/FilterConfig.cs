using System.Web;
using System.Web.Mvc;

namespace MIDAS.GBX.Notification
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

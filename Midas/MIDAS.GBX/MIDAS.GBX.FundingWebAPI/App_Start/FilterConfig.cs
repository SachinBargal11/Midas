using System.Web;
using System.Web.Mvc;

namespace MIDAS.GBX.FundingWebAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

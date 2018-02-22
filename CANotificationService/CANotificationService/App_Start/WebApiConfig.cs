using System.Web.Http;
using System.Web.Http.Cors;
using System.Net.Http.Headers;

namespace CANotificationService
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.EnableCors(new EnableCorsAttribute("*", "accept, authorization", "GET", "WWW-Authenticate"));
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
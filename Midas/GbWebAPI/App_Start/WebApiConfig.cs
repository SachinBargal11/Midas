using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using System.Configuration;
using System.Threading.Tasks;
using System.Threading;
using System.Net;

namespace GbWebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();
            //Reference: http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            config.MessageHandlers.Add(new PreflightRequestsHandler());
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            jsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            settings.Formatting = Newtonsoft.Json.Formatting.Indented;
            settings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
            settings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling =
                Newtonsoft.Json.PreserveReferencesHandling.None;
            //To Do
            //GlobalConfiguration.Configuration.Filters.Add(new LoggingFilterAttribute());
            //GlobalConfiguration.Configuration.Filters.Add(new GlobalExceptionAttribute());
            config.Filters.Add(new Elmah.Contrib.WebApi.ElmahHandleErrorApiAttribute());
        }
    }
}


public class PreflightRequestsHandler : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (request.Headers.Contains("Origin") && request.Method.Method == "OPTIONS")
        {
            var response = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
            response.Headers.Add("Access-Control-Allow-Methods", "*");
            var tsc = new TaskCompletionSource<HttpResponseMessage>();
            tsc.SetResult(response);
            return tsc.Task;
        }
        return base.SendAsync(request, cancellationToken);
    }
}
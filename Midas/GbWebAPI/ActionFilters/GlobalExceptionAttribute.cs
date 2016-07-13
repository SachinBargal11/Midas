using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Tracing;
using Midas.Common;
using GbWebAPI.Helpers;

namespace GbWebAPI.ActionFilters
{
    public class GlobalExceptionAttribute : ExceptionFilterAttribute
    {
        bool verboseErrorsEnabled = (ConfigurationManager.AppSettings["VerboseErrorsEnabled"] != null &&
                                     ConfigurationManager.AppSettings["VerboseErrorsEnabled"].ToString().ToLower() == "true") ? true : false;

        public override void OnException(HttpActionExecutedContext context)
        {
            GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new HTTPRequestLogger());
            ITraceWriter traceWriter = GlobalConfiguration.Configuration.Services.GetTraceWriter();
            string controllerName = context.ActionContext.ControllerContext.ControllerDescriptor.ControllerType.FullName;
            string controllerAction = "Action : " + context.ActionContext.ActionDescriptor.ActionName;

            traceWriter.Error(context.Request,
                              String.Format("Controller : {0} {1} {2}", controllerName, Environment.NewLine, controllerAction),
                              context.Exception);

            throw BuildResponseException(context);
        }

        public HttpResponseException BuildResponseException(HttpActionExecutedContext context)
        {
            Type exceptionType = context.Exception.GetType();
            string userFriendlyErrorMessage = String.Empty;
            HttpStatusCode statusCode;

            if (exceptionType == typeof(UnauthorizedAccessException) || exceptionType == typeof(GbAuthorizationException))
                statusCode = HttpStatusCode.Unauthorized;

            else if (exceptionType == typeof(GbValidationException))
                statusCode = HttpStatusCode.Forbidden;

            else
                statusCode = HttpStatusCode.InternalServerError;

            //The logic below is used to determine 1.) What type of exception is occurring and 2.) Whether we need to expose the full error message.
            //In production code, we will have the verbose errors flag off and our logging system will record the true error.
            switch (statusCode)
            {
                case HttpStatusCode.Unauthorized:
                case HttpStatusCode.Forbidden:
                    // Always expose authoring and validation error to customers.
                    return CreateServiceStatus(context, statusCode, context.Exception.Message, context.Exception.Message, verboseErrorsEnabled);

                case HttpStatusCode.InternalServerError:
                default:
                    if (verboseErrorsEnabled)
                        return CreateServiceStatus(context, statusCode, context.Exception.Message, context.Exception.ToString(), verboseErrorsEnabled);
                    else
                    {
                        userFriendlyErrorMessage = "An internal error has occurred.";
                        return CreateServiceStatus(context, statusCode, userFriendlyErrorMessage, context.Exception.ToString(), verboseErrorsEnabled);
                    }
            }
        }

        private HttpResponseException CreateServiceStatus(HttpActionExecutedContext context, HttpStatusCode statusCode, string statusMessage, string reasonPhrase, bool verboseErrorsEnabled)
        {
            return new HttpResponseException(
                         context.Request.CreateResponse(
                         statusCode,
                         new ServiceStatus()
                         {
                             StatusCode = (int)statusCode,
                             StatusMessage = statusMessage,
                             ReasonPhrase = reasonPhrase,
                             VerboseErrorsEnabled = verboseErrorsEnabled
                         }));
        }
    }
}
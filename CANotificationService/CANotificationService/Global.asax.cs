using System;
using System.Configuration;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Optimization;

namespace CANotificationService
{
    
    public class NotificationServiceApplication: System.Web.HttpApplication
    {
        public static DateTime LastRunTime;
        string providerConnectionString = new EntityConnectionStringBuilder(ConfigurationManager.ConnectionStrings["NotificationEntities"].ConnectionString.ToString()).ProviderConnectionString;
        protected void Application_Start()
        {
            LastRunTime = DateTime.Now;
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            SqlDependency.Start(providerConnectionString);
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            NotificationComponent NC = new NotificationComponent();
            NC.RegisterNotification(LastRunTime);
        }

        protected void Application_End()
        {
            //here we will stop Sql Dependency
            SqlDependency.Stop(providerConnectionString);
            Repository.NotificationRepository repository = new Repository.NotificationRepository();
            repository.RemoveUserConnectionAll();
        }
    }
}

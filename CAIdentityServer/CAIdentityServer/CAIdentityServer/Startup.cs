using Owin;
using Serilog;
using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Services;
using CAIdentityServer.Service;
using CAIdentityServer.Config;

namespace CAIdentityServer
{
    internal class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            Log.Logger = new LoggerConfiguration()
               .MinimumLevel.Debug()
               .WriteTo.File(@"c:\logs\CAIdentityServer.txt")
               .CreateLogger();

            ClientScopeService clientscopeservice = new ClientScopeService();

            app.Map("/core", coreApp =>
            {
                var factory = new IdentityServerServiceFactory()
                    //.UseInMemoryClients(Clients.Get())
                    .UseInMemoryClients(clientscopeservice.GetCLients())
                    //.UseInMemoryScopes(Scopes.Get());
                    .UseInMemoryScopes(clientscopeservice.GetScopes());

                factory.UserService = new Registration<IUserService, IndentityUserService>();



                factory.ConfigureClientStoreCache();
                factory.ConfigureScopeStoreCache();
                factory.ConfigureUserServiceCache();

                var options = new IdentityServerOptions
                {
                    SiteName = "IdentityServer3 - Custom Login Page",

                    SigningCertificate = Certificate.Get(),
                    Factory = factory,

                    AuthenticationOptions = new AuthenticationOptions
                    {
                        EnableSignOutPrompt = false,
                        RequireSignOutPrompt = false,
                        EnablePostSignOutAutoRedirect = true
                    },

                    EventsOptions = new EventsOptions
                    {
                        RaiseSuccessEvents = true,
                        RaiseErrorEvents = true,
                        RaiseFailureEvents = true,
                        RaiseInformationEvents = true
                    }
                };

                coreApp.UseIdentityServer(options);
            });
        }
    }
}
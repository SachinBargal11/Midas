using IdentityServer3.AccessTokenValidation;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;


[assembly: OwinStartup(typeof(MIDAS.GBX.PatientWebAPI.Startup))]

namespace MIDAS.GBX.PatientWebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var baseAddress = System.Configuration.ConfigurationManager.AppSettings.Get("AuthenticationAuthorityUrl");
            var clientId = System.Configuration.ConfigurationManager.AppSettings.Get("ClientID");
            var clientSecret = System.Configuration.ConfigurationManager.AppSettings.Get("Secret");

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = baseAddress,
                RequiredScopes = new[] { "MidasMedicalProviderAPI", "roles", "email" },

                // client credentials for the introspection endpoint
                ClientId = clientId,
                ClientSecret = clientSecret,
            });

            app.UseWebApi(WebApiConfig.Register());            
            //ConfigureAuth(app);
        }
    }
}

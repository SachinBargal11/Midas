using IdentityServer3.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CAIdentityServer.Service
{
    public class ClientScopeService
    {
        public List<Client> GetCLients()
        {
            Models.CAIdentityServerEntitiesModel context = new Models.CAIdentityServerEntitiesModel();

            List<Client> clients = new List<Client>();

            foreach (Models.Client clientitem in context.Clients.ToList())
            {
                Client client = new Client();

                client.ClientId = clientitem.ClientId;
                client.ClientName = clientitem.ClientName;
                client.Flow = (Flows)clientitem.Flow;
                if (clientitem.ClientUri != null || clientitem.ClientUri != string.Empty)
                {
                    client.ClientUri = clientitem.ClientUri;
                }
                client.RequireConsent = clientitem.RequireConsent;
                client.AllowRememberConsent = clientitem.AllowRememberConsent;
                client.AccessTokenLifetime = clientitem.AccessTokenLifetime;
                client.AccessTokenType = (AccessTokenType)clientitem.AccessTokenType;
                client.AuthorizationCodeLifetime = clientitem.AuthorizationCodeLifetime;
                client.IdentityTokenLifetime = clientitem.IdentityTokenLifetime;
                client.RefreshTokenUsage = (TokenUsage)clientitem.RefreshTokenUsage;
                client.RefreshTokenExpiration = (TokenExpiration)clientitem.RefreshTokenExpiration;
                client.AbsoluteRefreshTokenLifetime = clientitem.AbsoluteRefreshTokenLifetime;
                client.SlidingRefreshTokenLifetime = clientitem.SlidingRefreshTokenLifetime;
                client.UpdateAccessTokenClaimsOnRefresh = clientitem.UpdateAccessTokenClaimsOnRefresh;
                client.RequireSignOutPrompt = clientitem.RequireSignOutPrompt;
                client.RedirectUris = clientitem.ClientRedirectURIs.Select(r => r.URL).ToList();
                client.PostLogoutRedirectUris = clientitem.ClientPostLogoutRedirectURIs.Select(r => r.URL).ToList();
                client.AllowedCorsOrigins = clientitem.ClientAllowedCorsOrigins.Select(r => r.URL).ToList();
                client.AllowedScopes = clientitem.ClientScopes.Select(r => r.ScopeName).ToList();

                foreach (Models.ClientSecret clientsecret in clientitem.ClientSecrets)
                {
                    client.ClientSecrets.Add(new Secret(clientsecret.SecretValue.Sha256()));
                }

                clients.Add(client);
            }

            return clients;
        }

        public IEnumerable<Scope> GetScopes()
        {
            List<Scope> scopes = new List<Scope>();

            // Add standard identity scopes
            scopes.AddRange(
                new[]
                {

                    StandardScopes.OpenId,
                    StandardScopes.Profile,
                    StandardScopes.Email,
                    StandardScopes.Address,
                    StandardScopes.OfflineAccess,
                    StandardScopes.RolesAlwaysInclude,
                    StandardScopes.AllClaims
                    }
                );
            Models.CAIdentityServerEntitiesModel context = new Models.CAIdentityServerEntitiesModel();

            foreach (Models.Scope clientscope in context.Scopes.ToList())
            {
                Scope scope = new Scope();
                scope.Name = clientscope.Name;
                scope.DisplayName = clientscope.DisplayName;
                scope.Type = (ScopeType)clientscope.ScopeType;
                scope.ShowInDiscoveryDocument = clientscope.ShowInDiscoveryDocument;
                clientscope.Emphasize = clientscope.Emphasize;
                scope.Claims = clientscope.ScopeClaims.Select(c => new ScopeClaim { Name = c.Name, Description = c.ScopeClaimDescription, AlwaysIncludeInIdToken = c.AlwaysIncludeInIdToken }).ToList();

                foreach (Models.ScopeSecret clientscopesecret in clientscope.ScopeSecrets)
                {
                    scope.ScopeSecrets.Add(new Secret(clientscopesecret.SecretValue.Sha256()));
                }

                scopes.Add(scope);
            }

            return scopes.AsEnumerable();
        }

        public bool IsTwoFactorAuthentication(string clientid)
        {
            bool result = false;
            Models.CAIdentityServerEntitiesModel context = new Models.CAIdentityServerEntitiesModel();
            Models.Client client = context.Clients.Where(c => c.ClientId == clientid).FirstOrDefault();

            if (client != null)
            {
                //Two factor authentication does not work with resource owner workflow.
                if ((Flows)client.Flow == Flows.ResourceOwner)
                {
                    result = false;
                }
                else
                {
                    result = client.IsTwoFactorAuthentication;
                }
            }
            return result;
        }
    }
}
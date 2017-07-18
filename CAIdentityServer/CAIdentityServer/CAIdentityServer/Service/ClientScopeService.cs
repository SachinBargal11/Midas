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

            List<Client> clients = context.Clients.Where(c => c.IsEnabled == true).Select(d => new Client
            {
                ClientId = d.ClientId,
                ClientName = d.ClientName,
                Flow = (Flows)d.Flow,
                ClientUri = d.ClientUri,
                RequireConsent = d.RequireConsent,
                AllowRememberConsent = d.AllowRememberConsent,
                AccessTokenLifetime = d.AccessTokenLifetime,
                AccessTokenType = (AccessTokenType)d.AccessTokenType,
                AuthorizationCodeLifetime = d.AuthorizationCodeLifetime,
                IdentityTokenLifetime = d.IdentityTokenLifetime,
                RefreshTokenUsage = (TokenUsage)d.RefreshTokenUsage,
                RefreshTokenExpiration = (TokenExpiration)d.RefreshTokenExpiration,
                AbsoluteRefreshTokenLifetime = d.AbsoluteRefreshTokenLifetime,
                SlidingRefreshTokenLifetime = d.SlidingRefreshTokenLifetime,
                UpdateAccessTokenClaimsOnRefresh = d.UpdateAccessTokenClaimsOnRefresh,
                RequireSignOutPrompt = d.RequireSignOutPrompt,
                RedirectUris = d.ClientRedirectURIs.Select(r => r.URL).ToList(),
                PostLogoutRedirectUris = d.ClientPostLogoutRedirectURIs.Select(r => r.URL).ToList(),
                AllowedCorsOrigins = d.ClientAllowedCorsOrigins.Select(r => r.URL).ToList(),
                AllowedScopes = d.ClientScopes.Select(r => r.ScopeName).ToList(),

            }).ToList();

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

            foreach(Models.Scope clientscope in context.Scopes.ToList())
            {
                Scope scope = new Scope();
                scope.Name = clientscope.Name;
                scope.DisplayName = clientscope.DisplayName;
                scope.Type = (ScopeType)clientscope.ScopeType;
                scope.ShowInDiscoveryDocument = clientscope.ShowInDiscoveryDocument;
                clientscope.Emphasize = clientscope.Emphasize;
                scope.Claims = clientscope.ScopeClaims.Select(c => new ScopeClaim { Name = c.Name, Description = c.ScopeClaimDescription, AlwaysIncludeInIdToken = c.AlwaysIncludeInIdToken }).ToList();
                
                foreach(Models.ScopeSecret clientscopesecret in clientscope.ScopeSecrets)
                {
                    scope.ScopeSecrets.Add(new Secret(clientscopesecret.SecretValue.Sha256()));
                }

                scopes.Add(scope);
            }

            return scopes.AsEnumerable();
        }
    }
}
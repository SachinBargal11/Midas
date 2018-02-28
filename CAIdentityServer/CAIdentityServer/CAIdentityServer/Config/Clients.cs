/*
 * Copyright 2014 Dominick Baier, Brock Allen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using IdentityServer3.Core;
using IdentityServer3.Core.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace CAIdentityServer.Config
{
    public class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {

                /////////////////////////////////////////////////////////////
                // JavaScript Implicit Client - Manual
                /////////////////////////////////////////////////////////////
                new Client
                {
                    ClientName = "JavaScript Implicit Client - Manual",
                    ClientId = "js.manual",
                    Flow = Flows.Implicit,

                    AllowedScopes = new List<string>
                    {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        Constants.StandardScopes.Email,
                        Constants.StandardScopes.Roles,
                        "SampleWebAPI"
                    },

                    ClientUri = "https://identityserver.io",

                    RequireConsent = false,
                    AllowRememberConsent = true,

                    RedirectUris = new List<string>
                    {
                        "http://localhost/JavaScriptClient/index.html",
                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost/JavaScriptClient/index.html"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost/JavaScriptClient"
                    },

                    AccessTokenLifetime = 3600,
                    AccessTokenType = AccessTokenType.Jwt,

                    // refresh token settings
                    AbsoluteRefreshTokenLifetime = 86400,
                    SlidingRefreshTokenLifetime = 43200,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    RefreshTokenExpiration = TokenExpiration.Sliding
                },

                /////////////////////////////////////////////////////////////
                // JavaScript Implicit Client - TokenManager
                /////////////////////////////////////////////////////////////
                new Client
                {
                    ClientName = "JavaScript Implicit Client - UserManager",
                    ClientId = "js.usermanager",
                    Flow = Flows.Implicit,

                    AllowedScopes = new List<string>
                    {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        Constants.StandardScopes.Email,
                        Constants.StandardScopes.Roles,
                        "SampleWebAPI"
                    },

                    ClientUri = "https://identityserver.io",

                    RequireConsent = false,
                    AllowRememberConsent = true,


                    RedirectUris = new List<string>
                    {
                        "http://localhost/JavaScriptOidcClient/index.html",
                        "http://localhost/JavaScriptOidcClient/silent_renew.html",
                        "http://localhost/JavaScriptOidcClient/callback.html",
                        "http://localhost/JavaScriptOidcClient/frame.html",
                        "http://localhost/JavaScriptOidcClient/popup.html",
                    },

                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost/JavaScriptOidcClient/index.html",
                    },

                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost/JavaScriptOidcClient",
                    },

                    AccessTokenLifetime = 3600,
                    AccessTokenType = AccessTokenType.Jwt,

                    // refresh token settings
                    AbsoluteRefreshTokenLifetime = 86400,
                    SlidingRefreshTokenLifetime = 43200,
                    RefreshTokenUsage = TokenUsage.ReUse,
                    RefreshTokenExpiration = TokenExpiration.Sliding
                }
            };
        }
    }
}
namespace Sample
{
    public static class Constants
    {
        public const string BaseAddress = "https://lt007.codearray.tech/CAIdentityServer/core/";

        public const string AuthorizeEndpoint = BaseAddress + "/connect/authorize";
        public const string LogoutEndpoint = BaseAddress + "/connect/endsession";
        public const string TokenEndpoint = BaseAddress + "/connect/token";
        public const string UserInfoEndpoint = BaseAddress + "/connect/userinfo";
        public const string IdentityTokenValidationEndpoint = BaseAddress + "/connect/identitytokenvalidation";
        public const string TokenRevocationEndpoint = BaseAddress + "/connect/revocation";

        public const string AspNetWebApiSampleApi = "http://lt007.codearray.tech/SampleWebAPI/";
    }
}
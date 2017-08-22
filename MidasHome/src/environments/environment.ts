// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  IDENTITY_SCOPE: "openid profile email roles SampleWebAPI NotificationService",
  AUTHORIZATION_SERVER_URL: "https://identityserverdev.codearray.tk/core",
  CLIENT_ID: 'MidasPortal',
  MEDICAL_PROVIDER_URI: 'http://localhost:4201/',
  PATIENT_PORTAL_URI: 'http://localhost:4201/',
  ATTORNEY_PORTAL_URI: 'http://localhost:4201/',
  ANCILLARY_PORTAL_URI: 'http://localhost:4201/',
};

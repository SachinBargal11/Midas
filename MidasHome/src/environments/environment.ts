// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  AUTHORIZATION_SERVER_URL: "https://identityserverdev.codearray.tk/core",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  CLIENT_ID: 'MidasPortalLocal',          //local
  // CLIENT_ID: 'MidasPortalDev',            //staging dev
  MEDICAL_PROVIDER_URI: 'http://localhost:4201/',
  // PATIENT_PORTAL_URI: 'http://localhost:4202/',
  // ATTORNEY_PORTAL_URI: 'http://localhost:4203/',
  // ANCILLARY_PORTAL_URI: 'http://localhost:4204/',
  // MEDICAL_PROVIDER_URI: 'http://medicalproviderdev.codearray.tk/',
  // PATIENT_PORTAL_URI: 'http://patientdev.codearray.tk/',
  // ATTORNEY_PORTAL_URI: 'http://attorneydev.codearray.tk/',
  // ANCILLARY_PORTAL_URI: 'http://ancillarydev.codearray.tk/',
  // MEDICAL_PROVIDER_URI: 'http://caserver:7001/',
  PATIENT_PORTAL_URI: 'http://caserver:7009/',
  ATTORNEY_PORTAL_URI: 'http://caserver:7004/',
  ANCILLARY_PORTAL_URI: 'http://caserver:7007/',

  // REGISTER_MP_URL: 'http://medicalproviderdev.codearray.tk/#/account/register-company'
  REGISTER_MP_URL: 'http://localhost:4201/#/account/register-company'
};

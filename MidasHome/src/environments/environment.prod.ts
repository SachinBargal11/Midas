export const environment = {
  production: true,
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  AUTHORIZATION_SERVER_URL: "https://identityserverdev.codearray.tk/core",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalLocal',          //local
  CLIENT_ID: 'MidasPortalDev',            //staging dev
  // MEDICAL_PROVIDER_URI: 'http://localhost:4201/',
  // PATIENT_PORTAL_URI: 'http://localhost:4201/',
  // ATTORNEY_PORTAL_URI: 'http://localhost:4201/',
  // ANCILLARY_PORTAL_URI: 'http://localhost:4201/',
  MEDICAL_PROVIDER_URI: 'http://medicalproviderdev.codearray.tk/',
  PATIENT_PORTAL_URI: 'http://patientdev.codearray.tk/',
  ATTORNEY_PORTAL_URI: 'http://attorneydev.codearray.tk/',
  ANCILLARY_PORTAL_URI: 'http://ancillarydev.codearray.tk/',
  REGISTER_MP_URL: 'http://medicalproviderdev.codearray.tk/#/account/register-company'
};

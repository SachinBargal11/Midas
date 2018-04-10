// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false, 
   //SERVICE_BASE_URL: 'http://gb-patientwebapi.qwinix.io/midaspatientapi', 
  //SERVICE_BASE_URL: 'http://patientdevapi.codearray.tk/midaspatientapi', 
  SERVICE_BASE_URL: 'http://localhost:49899/midaspatientapi', 
  IDENTITY_SERVER_URL: 'https://localhost:44300/',
  // NOTIFICATION_SERVER_URL: 'http://caserver:7011',
  NOTIFICATION_SERVER_URL: 'http://dev-gb-notificationmanager.qwinix.io',
  HOME_URL: 'http://localhost:4204',
  APP_URL: 'http://localhost:4204',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  CLIENT_ID: 'MidasPortalLocal',                //local
};

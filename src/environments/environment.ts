// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // SERVICE_BASE_URL: 'http://medicalproviderapi.codearray.tk/midasapi',
  //SERVICE_BASE_URL: 'http://dev-gb-midasapi.qwinix.io/midasapi',
  SERVICE_BASE_URL: 'http://localhost:65184/midasapi',
  IDENTITY_SERVER_URL: 'https://localhost:44300',
  //NOTIFICATION_SERVER_URL: 'http://localhost/CANotificationService',
  NOTIFICATION_SERVER_URL: 'http://dev-gb-notificationmanager.qwinix.io',
  // HOME_URL: 'http://caserver:7013',
  HOME_URL: 'http://localhost:4201',
  MP_URL: 'http://localhost:4201',
  //MP_URL: 'http://caserver:7001',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  CLIENT_ID: 'MidasPortalLocal',                //local
};

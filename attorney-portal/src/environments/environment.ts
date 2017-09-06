// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // SERVICE_BASE_URL: 'http://attorneyapi.codearray.tk/midasattorneyapi'
  // SERVICE_BASE_URL: 'http://attorneydevapi.codearray.tk/midasattorneyapi',
  SERVICE_BASE_URL: 'http://caserver:7003/midasattorneyapi',
  IDENTITY_SERVER_URL: 'https://identityserverdev.codearray.tk',
  NOTIFICATION_SERVER_URL: 'http://caserver:7011',
  HOME_URL: 'http://caserver:7013',
  APP_URL: 'http://localhost:4201',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  CLIENT_ID: 'MidasPortalLocal',                //local
};

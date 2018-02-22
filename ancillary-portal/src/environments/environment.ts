// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // SERVICE_BASE_URL: 'http://ancillaryapi.codearray.tk/midasancillaryapi',
  // SERVICE_BASE_URL: 'http://gb-ancillarywebapi.qwinix.io/midasancillaryapi',
  SERVICE_BASE_URL: 'http://localhost:51995/midasancillaryapi',
  IDENTITY_SERVER_URL: 'https://gb-identityserver.qwinix.io',
  NOTIFICATION_SERVER_URL: 'http://gb-notificationmanager.qwinix.io',
  HOME_URL: 'http://localhost:4200',
  APP_URL: 'http://localhost:4204',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  CLIENT_ID: 'MidasPortalLocal',                //local
};

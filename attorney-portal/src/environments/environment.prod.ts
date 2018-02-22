export const environment = {
  production: true,
  // SERVICE_BASE_URL: 'http://attorneyapi.codearray.tk/midasattorneyapi'
  // SERVICE_BASE_URL: 'http://attorneydevapi.codearray.tk/midasattorneyapi',
  SERVICE_BASE_URL: 'http://gb-attorneywebapi.qwinix.io/midasattorneyapi',
  IDENTITY_SERVER_URL: 'https://gb-identityserver.qwinix.io',
  NOTIFICATION_SERVER_URL: 'http://gb-notificationmanager.qwinix.io',
  HOME_URL: 'http://greenyourbills.qwinix.io',
  APP_URL: 'http://gb-attorney.qwinix.io',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  // CLIENT_ID: 'MidasPortalLocal',                //local
};

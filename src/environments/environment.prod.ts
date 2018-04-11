export const environment = {
  production: true,
  // SERVICE_BASE_URL: 'http://ancillaryapi.codearray.tk/midasancillaryapi',
  SERVICE_BASE_URL: 'http://dev-gb-midasancillaryapi.qwinix.io/midasancillaryapi',
  // SERVICE_BASE_URL: 'http://caserver:7008/midasancillaryapi',
  IDENTITY_SERVER_URL: 'https://dev-gb-identityserver.qwinix.io',
  NOTIFICATION_SERVER_URL: 'http://dev-gb-notificationmanager.qwinix.io',
  HOME_URL: 'http://dev-greenyourbills.qwinix.io',
  APP_URL: 'http://dev-gb-ancillary.qwinix.io',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  // CLIENT_ID: 'MidasPortalLocal',                //local
};

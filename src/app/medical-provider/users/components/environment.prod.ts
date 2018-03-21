export const environment = {
  production: true,
  SERVICE_BASE_URL: 'http://dev-gb-midasapi.qwinix.io/midasapi',
  // SERVICE_BASE_URL: 'http://dev-gb-midasapi.qwinix.io/midasapi',
  IDENTITY_SERVER_URL: 'https://dev-gb-identityserver.qwinix.io',
  //IDENTITY_SERVER_URL: 'https://dev-gb-identityserver.qwinix.io',
  NOTIFICATION_SERVER_URL: 'http://dev-gb-notificationmanager.qwinix.io',
  //NOTIFICATION_SERVER_URL: 'http://dev-gb-notificationmanager.qwinix.io',
  // HOME_URL: 'http://dev-greenyourbills.qwinix.io',
  HOME_URL: 'http://dev-greenyourbills.qwinix.io',
  // MP_URL: 'http://dev-gb-medicalprovider.qwinix.io',
  MP_URL: 'http://dev-gb-medicalprovider.qwinix.io',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  // CLIENT_ID: 'MidasPortalLocal',                //local
};

export const environment = {
  production: true,
  // SERVICE_BASE_URL: 'http://medicalproviderapi.codearray.tk/midasapi'
  SERVICE_BASE_URL: 'http://medicalproviderdevapi.codearray.tk/midasapi',
  // SERVICE_BASE_URL: 'http://caserver:7002/midasapi',
  IDENTITY_SERVER_URL: 'https://identityserverdev.codearray.tk',
  // NOTIFICATION_SERVER_URL: 'http://caserver:7011',
  NOTIFICATION_SERVER_URL: 'http://notification.codearray.tk',
  // HOME_URL: 'http://caserver:7013',
  HOME_URL: 'http://midasdev.codearray.tk',
  // MP_URL: 'http://localhost:4201',
  MP_URL: 'http://medicalproviderdev.codearray.tk',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  CLIENT_ID: 'MidasPortalDev',               //staging dev
  // CLIENT_ID: 'MidasPortalLocal',                //local
};

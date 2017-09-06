export const environment = {
  production: true,
  // SERVICE_BASE_URL: 'http://ancillaryapi.codearray.tk/midasancillaryapi',
  SERVICE_BASE_URL: 'http://ancillarydevapi.codearray.tk/midasancillaryapi',
  // SERVICE_BASE_URL: 'http://caserver:7008/midasancillaryapi',
  IDENTITY_SERVER_URL: 'https://identityserverdev.codearray.tk',
  NOTIFICATION_SERVER_URL: 'http://caserver:7011',
  HOME_URL: 'http://caserver:7013',
  APP_URL: 'http://localhost:4201',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  CLIENT_ID: 'MidasPortalLocal',                //local
};

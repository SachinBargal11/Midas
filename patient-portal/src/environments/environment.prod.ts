export const environment = {
  production: true, 
  // SERVICE_BASE_URL: 'http://patientapi.codearray.tk/midaspatientapi' 
  SERVICE_BASE_URL: 'http://gb-patientwebapi.qwinix.io/midaspatientapi', 
  // SERVICE_BASE_URL: 'http://caserver:7010/midaspatientapi'   
  IDENTITY_SERVER_URL: 'https://gb-identityserver.qwinix.io',
  NOTIFICATION_SERVER_URL: 'http://gb-notificationmanager.qwinix.io',
  HOME_URL: 'http://greenyourbills.qwinix.io',
  APP_URL: 'http://gb-patient.qwinix.io',
  
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  CLIENT_ID: 'MidasPortal',                  //staging production
  // CLIENT_ID: 'MidasPortalDev',               //staging dev
  // CLIENT_ID: 'MidasPortalLocal',                //local
};

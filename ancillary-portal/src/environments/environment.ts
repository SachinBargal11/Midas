// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // SERVICE_BASE_URL: 'http://ancillaryapi.codearray.tk/midasancillaryapi',
  SERVICE_BASE_URL: 'http://ancillarydevapi.codearray.tk/midasancillaryapi',
  // SERVICE_BASE_URL: 'http://caserver:7008/midasancillaryapi',
  IDENTITY_SERVER_URL: 'https://identityserverdev.codearray.tk',
  NOTIFICATION_SERVER_URL: 'http://caserver:7011',
  HOME_URL: 'http://localhost:4200/home',
  APP_URL: 'http://localhost:4201'
};

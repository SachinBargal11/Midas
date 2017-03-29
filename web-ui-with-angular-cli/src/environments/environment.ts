// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: true,
  //Staging server data
  // SERVICE_BASE_URL: 'http://midas.codearray.tk:5001/midasapi'
  SERVICE_BASE_URL: 'http://midas.codearray.tk/midasapi'
  //local data
  // SERVICE_BASE_URL: 'http://cadev:5001'
};

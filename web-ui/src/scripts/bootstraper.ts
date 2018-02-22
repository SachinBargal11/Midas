// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The app module
// import { AppModule } from '../modules/app-module';
import { RootModule } from '../modules/root-module';

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(RootModule);

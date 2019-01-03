import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
LicenseManager.setLicenseKey(
  'Evaluation_License_Valid_Until__24_November_2018__MTU0MzAxNzYwMDAwMA==a39c92782187aa78196ed1593ccd1527'
);

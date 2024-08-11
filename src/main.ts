// This is the starting point of the application
// my note: boostrapApplication bootstraps (loads/starts) an instance of an Angular application and renders a standalone component as the application's root component

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

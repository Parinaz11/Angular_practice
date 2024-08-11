import { provideHttpClient } from '@angular/common/http'; // It allows the application to make http requests to external APIs or services
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // ApplicationConfig is an interface that defines the structure for application config in Angular
import { provideRouter } from '@angular/router'; //  It allows you to define routes and navigation within the project

// In Angular, routing allows us to load specific modules or components when accessing routes like /home or /dashboard/menu
import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations'


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAnimations()]
};

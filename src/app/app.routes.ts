import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, // component: The Angular component that should be rendered when the route is activated
    },
    // how you would lazy load a module when accessing a single route
    {
        path: 'about-us',
        loadChildren: () =>
            import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
    }
];

// This keyword makes the routes (which is a constant and cannot be changed) available for import in other modules or files


import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';

export const routes: Routes = [
    {
        path: 'prayer',
        title: 'Prayer Times',
        component: PrayerTimesComponent,
        resolve: {
            latitude: (route: ActivatedRouteSnapshot) => route.queryParams['latitude'],
            longitude: (route: ActivatedRouteSnapshot) => route.queryParams['longitude']
        }
    },
    {
        path: '',
        redirectTo: 'prayer',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'prayer'
    }
];

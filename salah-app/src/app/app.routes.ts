import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';

export const routes: Routes = [
    {
        path: 'prayer',
        title: 'Prayer Times',
        component: PrayerTimesComponent
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

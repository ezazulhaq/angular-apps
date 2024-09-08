import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { KaabaComponent } from './kaaba/kaaba.component';

export const routes: Routes = [
    {
        path: 'prayer',
        title: 'Prayer Times',
        component: PrayerTimesComponent
    },
    {
        path: 'kaaba',
        title: 'Kaaba',
        component: KaabaComponent
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

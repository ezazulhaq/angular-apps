import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { KaabaComponent } from './kaaba/kaaba.component';
import { QuranComponent } from './quran/quran.component';
import { LibraryComponent } from './quran/library/library.component';

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
        path: 'quran',
        title: 'Quran Reader',
        component: QuranComponent
    },
    {
        path: 'library',
        title: 'Quran Library',
        component: LibraryComponent
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

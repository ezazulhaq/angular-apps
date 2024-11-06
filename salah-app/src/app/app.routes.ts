import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { KaabaComponent } from './kaaba/kaaba.component';
import { LibraryComponent } from './library/library.component';
import { ReaderComponent } from './library/reader/reader.component';
import { QuranComponent } from './quran/quran.component';
import { AyahComponent } from './quran/ayah/ayah.component';

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
        title: 'Quran',
        component: QuranComponent
    },
    {
        path: 'quran/ayah',
        title: 'Ayah',
        component: AyahComponent
    },
    {
        path: 'library',
        title: 'Islamic Library',
        component: LibraryComponent
    },
    {
        path: 'reader',
        title: 'Library Reader',
        component: ReaderComponent
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

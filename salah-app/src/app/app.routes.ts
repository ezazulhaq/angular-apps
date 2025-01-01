import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { KaabaComponent } from './kaaba/kaaba.component';
import { LibraryComponent } from './library/library.component';
import { ReaderComponent } from './library/reader/reader.component';
import { QuranComponent } from './quran/quran.component';
import { AyahComponent } from './quran/ayah/ayah.component';
import { HadithComponent } from './hadith/hadith.component';
import { ChapterComponent } from './hadith/chapter/chapter.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Salah',
        component: HomeComponent
    },
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
        path: 'hadith',
        title: 'Hadith',
        component: HadithComponent
    },
    {
        path: 'hadith/chapter',
        title: 'Chapter',
        component: ChapterComponent
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
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

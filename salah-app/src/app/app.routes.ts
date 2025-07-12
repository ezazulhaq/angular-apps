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
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guard/auth.gaurd';
import { ProfileComponent } from './profile/profile.component';
import { TasbihComponent } from './tasbih/tasbih.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'register',
        title: 'Register',
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        title: 'Reset Password',
        component: ResetPasswordComponent
    },
    {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent,
        canActivate: [
            authGuard
        ]
    },
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
        component: QuranComponent,
        canActivate: [
            authGuard
        ]
    },
    {
        path: 'quran/ayah',
        title: 'Ayah',
        component: AyahComponent,
        canActivate: [
            authGuard
        ]
    },
    {
        path: 'hadith',
        title: 'Hadith',
        component: HadithComponent,
        canActivate: [
            authGuard
        ]
    },
    {
        path: 'hadith/chapter',
        title: 'Chapter',
        component: ChapterComponent,
        canActivate: [
            authGuard
        ]
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
        path: 'feedback',
        title: 'Feedback',
        component: FeedbackComponent
    },
    {
        path: 'tasbih',
        title: 'Tasbih Counter',
        component: TasbihComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './home/module/prayer-times/prayer-times.component';
import { KaabaComponent } from './home/module/kaaba/kaaba.component';
import { LibraryComponent } from './home/module/library/library.component';
import { ReaderComponent } from './home/module/library/reader/reader.component';
import { QuranComponent } from './home/module/quran/quran.component';
import { AyahComponent } from './home/module/quran/ayah/ayah.component';
import { HadithComponent } from './home/module/hadith/hadith.component';
import { ChapterComponent } from './home/module/hadith/chapter/chapter.component';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './guard/auth.gaurd';
import { ProfileComponent } from './profile/profile.component';
import { TasbihComponent } from './tasbih/tasbih.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

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
        title: 'Home',
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

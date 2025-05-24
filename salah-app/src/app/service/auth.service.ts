import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { AuthSession, LoginCredentials, RegisterCredentials, User } from '../model/auth.model';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase: SupabaseClient;
  private router = inject(Router);

  // Use signals for reactive state management (Angular v14+)
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );

    // Check for existing session on init
    this.loadUser();
  }

  private async loadUser(): Promise<void> {
    const { data } = await this.supabase.auth.getSession();

    if (data.session) {
      const user = data.session.user;
      this.currentUser.set({
        id: user.id,
        email: user.email || '',
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at
      });
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    return from(this.supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        const session = response.data.session;
        const user = response.data.user;

        if (user) {
          this.currentUser.set({
            id: user.id,
            email: user.email || '',
            createdAt: user.created_at,
            lastSignInAt: user.last_sign_in_at
          });
          this.isAuthenticated.set(true);
        }

        return {
          user: this.currentUser(),
          accessToken: session?.access_token || null,
          refreshToken: session?.refresh_token || null
        };
      }),
      catchError(error => {
        if (error.message?.includes('captcha')) {
          return throwError(() => new Error('CAPTCHA verification failed. Please refresh and try again.'));
        }
        return throwError(() => new Error(error.message || 'Failed to login'));
      })
    );
  }

  register(credentials: RegisterCredentials): Observable<AuthSession> {
    return from(this.supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          username: credentials.username
        },
      }
    })).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        const session = response.data.session;
        const user = response.data.user;

        if (user) {
          this.currentUser.set({
            id: user.id,
            email: user.email || '',
            createdAt: user.created_at,
          });
          this.isAuthenticated.set(true);
        }

        return {
          user: this.currentUser(),
          accessToken: session?.access_token || null,
          refreshToken: session?.refresh_token || null
        };
      }),
      catchError(error => {
        if (error.message?.includes('captcha')) {
          return throwError(() => new Error('CAPTCHA verification failed. Please refresh and try again.'));
        }
        return throwError(() => new Error(error.message || 'Failed to register'));
      })
    );
  }

  logout(): Observable<void> {
    return from(this.supabase.auth.signOut()).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        this.router.navigate(['/home']);
      }),
      map(() => void 0),
      catchError(error => {
        return throwError(() => new Error(error.message || 'Failed to logout'));
      })
    );
  }

  refreshSession(): Observable<AuthSession> {
    return from(this.supabase.auth.refreshSession()).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        const session = response.data.session;

        return {
          user: this.currentUser(),
          accessToken: session?.access_token || null,
          refreshToken: session?.refresh_token || null
        };
      }),
      catchError(error => {
        return throwError(() => new Error(error.message || 'Failed to refresh session'));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}

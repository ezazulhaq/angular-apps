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
    try {
      const { data, error } = await this.supabase.auth.getSession();

      if (error) {
        console.error('Error loading user session:', error);
        return;
      }

      if (data.session) {
        this.setUserFromSession(data.session.user);
      }
    } catch (error) {
      console.error('Failed to load user session:', error);
    }
  }

  private setUserFromSession(user: any): void {
    this.currentUser.set({
      id: user.id,
      email: user.email || '',
      createdAt: user.created_at,
      lastSignInAt: user.last_sign_in_at
    });
    this.isAuthenticated.set(true);
  }

  private handleAuthError(error: any): Observable<never> {
    if (error.message?.includes('captcha')) {
      return throwError(() => new Error('CAPTCHA verification failed. Please refresh and try again.'));
    }
    if (error.message?.includes('Invalid login credentials')) {
      return throwError(() => new Error('Invalid email or password'));
    }
    if (error.message?.includes('Email not confirmed')) {
      return throwError(() => new Error('Please check your email and confirm your account'));
    }
    if (error.message?.includes('Password should be at least')) {
      return throwError(() => new Error('Password must be at least 6 characters long'));
    }
    if (error.message?.includes('User already registered')) {
      return throwError(() => new Error('An account with this email already exists'));
    }
    if (error.message?.includes('Invalid email')) {
      return throwError(() => new Error('Please enter a valid email address'));
    }
    return throwError(() => new Error(error.message || 'An unexpected error occurred'));
  }

  private createAuthSession(session: any, user: any): AuthSession {
    if (user) {
      this.setUserFromSession(user);
    }
    return {
      user: this.currentUser(),
      accessToken: session?.access_token || null,
      refreshToken: session?.refresh_token || null
    };
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
        return this.createAuthSession(response.data.session, response.data.user);
      }),
      catchError(error => this.handleAuthError(error))
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

        if (!response.data.session && response.data.user) {
          // Email confirmation required
          return {
            user: null,
            accessToken: null,
            refreshToken: null
          };
        }

        return this.createAuthSession(response.data.session, response.data.user);
      }),
      catchError(error => this.handleAuthError(error))
    );
  }

  forgotPassword(email: string): Observable<void> {
    return from(this.supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`
      }
    )).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return void 0;
      }),
      catchError(error => {
        if (error.message?.includes('Invalid email')) {
          return throwError(() => new Error('Please enter a valid email address'));
        }
        if (error.message?.includes('Email not found')) {
          return throwError(() => new Error('No account found with this email address'));
        }
        return throwError(() => new Error(error.message || 'Failed to send reset email'));
      })
    );
  }

  updatePassword(newPassword: string): Observable<void> {
    return from(this.supabase.auth.updateUser({
      password: newPassword
    })).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return void 0;
      }),
      catchError(error => {
        if (error.message?.includes('Password should be at least')) {
          return throwError(() => new Error('Password must be at least 6 characters long'));
        }
        if (error.message?.includes('New password should be different')) {
          return throwError(() => new Error('New password must be different from current password'));
        }
        if (error.message?.includes('Unauthorized')) {
          return throwError(() => new Error('You must be logged in to update your password'));
        }
        return throwError(() => new Error(error.message || 'Failed to update password'));
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
        const user = response.data.user;

        // Update user state with refreshed session
        if (user && session) {
          this.setUserFromSession(user);
        } else {
          // Session expired, clear user state
          this.currentUser.set(null);
          this.isAuthenticated.set(false);
        }

        return {
          user: this.currentUser(),
          accessToken: session?.access_token || null,
          refreshToken: session?.refresh_token || null
        };
      }),
      catchError(error => {
        // Clear user state on refresh failure
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        return throwError(() => new Error(error.message || 'Failed to refresh session'));
      })
    );
  }

  // Security methods
  async validateSession(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error || !data.session) {
        this.clearAuthState();
        return false;
      }
      return true;
    } catch {
      this.clearAuthState();
      return false;
    }
  }

  clearAuthState(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  getValidAccessToken(): string | null {
    if (!this.isAuthenticated()) {
      return null;
    }
    
    try {
      // Get token from Supabase client instead of localStorage directly
      const session = this.supabase.auth.getSession();
      return session ? (session as any).data?.session?.access_token || null : null;
    } catch {
      return null;
    }
  }


}

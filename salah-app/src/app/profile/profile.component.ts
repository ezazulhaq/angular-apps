import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserMetaData, User } from '../model/auth.model';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../shared/title/title.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TitleComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  host: {
    class: "app-bg"
  }
})
export class ProfileComponent {

  profileForm: FormGroup;
  user = signal<UserMetaData | null>(null);
  updateSuccess = false;
  updateError = '';
  loading = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.user.set(this.authService.userMetaData());

    this.profileForm = this.fb.group({
      username: [this.user()?.username || '', [Validators.required, Validators.minLength(3)]],
      email: [{ value: this.user()?.email || '', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.updateSuccess = false;
    this.updateError = '';

    // Note: This is a simplified example. In a real app, you would implement profile updates through Supabase
    // For now, we'll simulate a successful update
    setTimeout(() => {
      // Implement actual profile update logic with Supabase here
      if (this.user) {
        this.user.update(user => user
          ? {
            ...user,
            displayName: this.profileForm.get('username')?.value
          }
          : null);

        // Update the current user in the auth service
        //this.authService.currentUser.set(this.user());

        this.updateSuccess = true;
      } else {
        this.updateError = 'Failed to update profile';
      }

      this.loading = false;

      // Reset success message after a few seconds
      if (this.updateSuccess) {
        setTimeout(() => {
          this.updateSuccess = false;
        }, 3000);
      }
    }, 1000);
  }

}

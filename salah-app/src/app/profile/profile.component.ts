import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { User } from '../model/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileForm: FormGroup;
  user: User | null = null;
  updateSuccess = false;
  updateError = '';
  loading = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    this.user = this.authService.currentUser();

    this.profileForm = this.fb.group({
      username: [this.user?.displayName || '', [Validators.required, Validators.minLength(3)]],
      email: [{ value: this.user?.email || '', disabled: true }]
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
        this.user = {
          ...this.user,
          displayName: this.profileForm.get('username')?.value
        };

        // Update the current user in the auth service
        this.authService.currentUser.set(this.user);

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

import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FeedbackService } from '../service/feedback.service';
import { SuccessComponent } from './success/success.component';
import { Router } from '@angular/router';
import { TitleComponent } from '../shared/title/title.component';
import { AuthService } from '../service/auth.service';
import { FeedbackDataResponse } from '../model/feedback.model';

@Component({
  selector: 'app-feedback',
  imports: [
    ReactiveFormsModule,
    SuccessComponent,
    TitleComponent,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
  host: {
    class: "app-bg"
  }
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError: string | null = null;
  isAuthenticated = signal<boolean>(false);

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {
    this.feedbackForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
      email: [authService.currentUser()?.email || '', [Validators.required, Validators.email]],
      category: ['General']
    });
    this.isAuthenticated.set(this.authService.isAuthenticated());
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  async onSubmit() {
    if (this.feedbackForm.invalid) return;

    this.isSubmitting.set(true);
    this.submitError = null;

    try {
      const result = await this.feedbackService.submitFeedback({
        content: this.feedbackForm.value.content,
        email: this.feedbackForm.value.email,
        category: this.feedbackForm.value.category
      });

      if (result.success) {
        this.submitSuccess.set(true);
        this.feedbackForm.reset({ category: 'General' });

        const feedbackData: FeedbackDataResponse = JSON.parse(JSON.stringify(result.data))[0];
        this.feedbackService.sentNotification(feedbackData)
          .subscribe(
            {
              next: data => {
                console.log(`Notification sent successfully: ${data}`);
              },
              error: error => {
                console.error(`Error sending notification: ${error}`);
              },
              complete: () => {
                console.log('Notification sent successfully');
              }
            }
          );

        this.feedbackService.updateFeedbackSentStatus(feedbackData.id).subscribe({
          next: data => {
            console.log(`Feedback sent status updated successfully: ${data}`);
          },
          error: error => {
            console.error(`Error updating feedback sent status: ${error}`);
          },
          complete: () => {
            console.log('Feedback sent status updated successfully');
          }
        });

      } else {
        this.submitError = 'Failed to submit feedback. Please try again.';
      }
    } catch (error) {
      this.submitError = 'An unexpected error occurred.';
      console.error(error);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}

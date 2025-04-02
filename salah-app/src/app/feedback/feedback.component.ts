import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FeedbackService } from '../service/feedback.service';
import { SuccessComponent } from './success/success.component';

@Component({
  selector: 'app-feedback',
  imports: [
    TitleCasePipe,
    ReactiveFormsModule,
    SuccessComponent,
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

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.feedbackForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['General']
    });
  }

  async onSubmit() {
    if (this.feedbackForm.invalid) return;

    this.isSubmitting.set(true);
    this.submitError = null;

    try {
      const result = await this.feedbackService.submitFeedback({
        content: this.feedbackForm.value.content,
        category: this.feedbackForm.value.category
      });

      if (result.success) {
        this.submitSuccess.set(true);
        this.feedbackForm.reset({ category: 'General' });
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

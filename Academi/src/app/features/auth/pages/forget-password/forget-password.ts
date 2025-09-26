import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  email: string = '';
  isLoading: boolean = false;
  emailSent: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) { }

  sendResetLink(): void {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.errorMessage = 'يرجى إدخال عنوان بريد إلكتروني صحيح';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.emailSent = true;

      // Navigate to verify code page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/verify-code'], {
          queryParams: { email: this.email }
        });
      }, 2000);
    }, 1500);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get submitButtonText(): string {
    if (this.isLoading) {
      return 'جاري الإرسال...';
    }
    if (this.emailSent) {
      return 'تم الإرسال بنجاح';
    }
    return 'إرسال رابط الاستعادة';
  }

  get submitButtonDisabled(): boolean {
    return !this.email || this.isLoading || this.emailSent;
  }
}
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword implements OnInit {
  newPassword = signal<string>('');
  confirmPassword = signal<string>('');
  userEmail = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  isVerified = signal<boolean>(false);

  // Password strength computed signal
  passwordStrength = computed(() => {
    const password = this.newPassword();
    if (!password) return { strength: '', score: 0 };
    let score = 0;
    let strength = '';

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // special characters
    if (score < 2) strength = 'ضعيف';
    else if (score < 4) strength = 'متوسط';
    else if (score < 6) strength = 'قوي';
    else strength = 'قوي جداً';
    return { strength, score };
  });

  passwordsMatch = computed(() => {
    const newPwd = this.newPassword();
    const confirmPwd = this.confirmPassword();
    if (!newPwd || !confirmPwd) return true; 
    return newPwd === confirmPwd;
  });

  passwordRequirements = computed(() => {
    const password = this.newPassword();
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
  });

  formValid = computed(() => {
    return this.newPassword().length >= 8 &&
      this.confirmPassword() &&
      this.passwordsMatch() &&
      this.passwordRequirements().length &&
      !this.isLoading();
  });

  submitButtonText = computed(() => {
    if (this.isLoading()) {
      return 'جاري التحديث...';
    }
    if (this.successMessage()) {
      return 'تم التحديث بنجاح';
    }
    return 'تحديث كلمة المرور';
  });

  strengthColorClass = computed(() => {
    const strength = this.passwordStrength().strength;
    switch (strength) {
      case 'ضعيف': return 'text-red-500';
      case 'متوسط': return 'text-yellow-500';
      case 'قوي': return 'text-green-500';
      case 'قوي جداً': return 'text-green-600';
      default: return 'text-gray-400';
    }
  });

  strengthBarWidth = computed(() => {
    const score = this.passwordStrength().score;
    return Math.min((score / 6) * 100, 100);
  });

  strengthBarColor = computed(() => {
    const strength = this.passwordStrength().strength;
    switch (strength) {
      case 'ضعيف': return 'bg-red-400';
      case 'متوسط': return 'bg-yellow-400';
      case 'قوي': return 'bg-green-400';
      case 'قوي جداً': return 'bg-green-600';
      default: return 'bg-gray-300';
    }
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userEmail.set(params['email'] || '');
      this.isVerified.set(params['verified'] === 'true');

      // Redirect if not verified
      if (!this.isVerified()) {
        this.router.navigate(['/forget-password']);
      }
    });
  }

  changePassword(): void {
    if (!this.formValid()) {
      this.errorMessage.set('يرجى التأكد من صحة البيانات المدخلة');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    // Simulate API call for password change
    setTimeout(() => {
      this.isLoading.set(false);

      // Simulate success response
      this.successMessage.set('تم تحديث كلمة المرور بنجاح!');

      // Redirect to login after success
      setTimeout(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            message: 'password-changed',
            email: this.userEmail()
          }
        });
      }, 2000);
    }, 1500);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update(show => !show);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['/verify-code'], {
      queryParams: { email: this.userEmail() }
    });
  }

  // Input event handlers for signals
  onNewPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newPassword.set(input.value);

    // Clear error message when user starts typing
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  onConfirmPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.confirmPassword.set(input.value);

    // Clear error message when user starts typing
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  // Password validation helpers
  getRequirementClass(met: boolean): string {
    return met ? 'text-green-600' : 'text-gray-400';
  }

  getRequirementIcon(met: boolean): string {
    return met ? '✓' : '○';
  }
}
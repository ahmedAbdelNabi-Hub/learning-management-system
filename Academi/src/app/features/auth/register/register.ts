// registration-steps.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-steps',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('stepProgress', [
      state('inactive', style({ transform: 'scale(1)', backgroundColor: '#e5e7eb' })),
      state('active', style({ transform: 'scale(1.1)', backgroundColor: '#3b82f6' })),
      state('completed', style({ transform: 'scale(1)', backgroundColor: '#10b981' })),
      transition('* => *', animate('200ms ease-in-out'))
    ])
  ],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegistrationStepsComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4;
  isSubmitting = false;

  personalForm!: FormGroup;
  contactForm!: FormGroup;
  securityForm!: FormGroup;
  addressForm!: FormGroup;

  steps = [
    { id: 1, title: 'Personal Info', icon: 'user', completed: false },
    { id: 2, title: 'Contact', icon: 'mail', completed: false },
    { id: 3, title: 'Security', icon: 'lock', completed: false },
    { id: 4, title: 'Address', icon: 'map-pin', completed: false }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    this.personalForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      alternateEmail: ['', Validators.email]
    });

    this.securityForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['', Validators.required]
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getCurrentForm(): FormGroup {
    switch (this.currentStep) {
      case 1: return this.personalForm;
      case 2: return this.contactForm;
      case 3: return this.securityForm;
      case 4: return this.addressForm;
      default: return this.personalForm;
    }
  }

  nextStep() {
    const currentForm = this.getCurrentForm();

    if (currentForm.valid) {
      this.steps[this.currentStep - 1].completed = true;
      this.currentStep = Math.min(this.currentStep + 1, this.totalSteps);
    } else {
      this.markFormGroupTouched(currentForm);
    }
  }

  prevStep() {
    this.currentStep = Math.max(this.currentStep - 1, 1);
  }

  goToStep(step: number) {
    if (step <= this.currentStep || this.steps[step - 1].completed) {
      this.currentStep = step;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getStepState(stepIndex: number): string {
    const step = this.steps[stepIndex];
    if (step.completed) return 'completed';
    if (step.id === this.currentStep) return 'active';
    return 'inactive';
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      if (field.errors['pattern']) return 'Please enter a valid format';
      if (field.errors['passwordMismatch']) return 'Passwords do not match';
    }
    return '';
  }

  async onSubmit() {
    if (this.addressForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const formData = {
        personal: this.personalForm.value,
        contact: this.contactForm.value,
        security: this.securityForm.value,
        address: this.addressForm.value
      };

      console.log('Registration Data:', formData);
      alert('Registration completed successfully!');
      this.isSubmitting = false;
    } else {
      this.markFormGroupTouched(this.addressForm);
    }
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
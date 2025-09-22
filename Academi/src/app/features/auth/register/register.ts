import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";

@Component({
  selector: 'app-registration-steps',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  animations: [
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
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent]
})
export class RegistrationStepsComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  isSubmitting = false;
  personalForm!: FormGroup;
  passwordForm!: FormGroup;
  documentForm!: FormGroup;

  steps = [
    { id: 1, title: 'البيانات الشخصية', icon: 'user', completed: false },
    { id: 2, title: 'كلمة المرور الخاصة بك ', icon: 'lock', completed: false },
    { id: 3, title: 'رفع الملفات', icon: 'upload', completed: false },
  ];
  cuurentStepName = signal<string>(this.steps[0].title)

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    this.personalForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.documentForm = this.fb.group({
      cvFile: [null],
      imageFile: [null],
      videoLink: ['']
    });
  }



  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.documentForm.patchValue({ [controlName]: file });
    }
  }

  getCurrentForm(): FormGroup {
    switch (this.currentStep) {
      case 1: return this.personalForm;
      case 2: return this.passwordForm;
      case 3: return this.documentForm;
      default: return this.personalForm;
    }
  }

  nextStep() {
    const currentForm = this.getCurrentForm();
    if (currentForm.valid) {
      this.steps[this.currentStep - 1].completed = true;
      this.currentStep = Math.min(this.currentStep + 1, this.totalSteps);
      this.cuurentStepName.set(this.steps[this.currentStep - 1].title);
    } else {
      this.markFormGroupTouched(currentForm);
    }
  }

  prevStep() {
    this.currentStep = Math.max(this.currentStep - 1, 1);
    this.cuurentStepName.set(this.steps[this.currentStep - 1].title);
  }

  goToStep(step: number) {
    if (step <= this.currentStep || this.steps[step - 1].completed) {
      this.currentStep = step;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} مطلوب`;
      if (field.errors['email']) return 'الرجاء إدخال بريد إلكتروني صحيح';
      if (field.errors['minlength']) return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
      if (field.errors['passwordMismatch']) return 'كلمات المرور غير متطابقة';
    }
    return '';
  }

  onSubmit() {
    if (this.personalForm.valid && this.passwordForm.valid && this.documentForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();

      Object.keys(this.personalForm.value).forEach(key => {
        formData.append(`personal.${key}`, this.personalForm.value[key]);
      });

      Object.keys(this.passwordForm.value).forEach(key => {
        formData.append(`password.${key}`, this.passwordForm.value[key]);
      });

      const documentValues = this.documentForm.value;
      if (documentValues.cvFile) {
        formData.append("cvFile", documentValues.cvFile);
      }
      if (documentValues.imageFile) {
        formData.append("imageFile", documentValues.imageFile);
      }
      if (documentValues.videoLink) {
        formData.append("videoLink", documentValues.videoLink);
      }

      console.log("Final FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      alert('تم التسجيل بنجاح!');
      this.isSubmitting = false;
    } else {
      this.markFormGroupTouched(this.personalForm);
      this.markFormGroupTouched(this.passwordForm);
      this.markFormGroupTouched(this.documentForm);
    }
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}

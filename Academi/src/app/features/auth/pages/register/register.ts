import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { LocationService } from '../../services/location.service';
import { IGovernorate } from '../../interface/locations/IGovernorate';
import { ICity } from '../../interface/locations/ICity';
import { StageService } from '../../services/stage.service';

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
export class RegistrationStepsComponent implements OnInit, OnDestroy {
  currentStep = 1;
  totalSteps = 4;
  isSubmitting = false;
  personalForm!: FormGroup;
  securityForm!: FormGroup;
  addressForm!: FormGroup;
  documentForm!: FormGroup;
  steps = [
    { id: 1, title: 'البيانات الشخصية', icon: 'user', completed: false },
    { id: 2, title: 'كلمة المرور الخاصة بك و الايميل', icon: 'lock', completed: false },
    { id: 3, title: 'العنوان و المرحله التعلميه', icon: 'map-pin', completed: false },
    { id: 4, title: 'رفع المستندات', icon: 'upload', completed: false },
  ];

  currentStepName = signal<string>(this.steps[0].title);

  governorates = signal<IGovernorate[]>([]);
  cities = signal<ICity[]>([]);
  grades = signal<any[]>([]);
  divisions = signal<any[]>([]);

  private destroyed$ = new Subject<void>();



  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private stageService: StageService
  ) { }

  ngOnInit() {
    this.initializeForms();
    this.fetchGovernorates();
    this.fetchStages();
    this.setupGovernorateChangeListener();
    this.setupGradeChangeListener();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initializeForms() {
    this.personalForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      parentPhone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
    });

    this.securityForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/)]]
    });

    this.addressForm = this.fb.group({
      governorateId: ['', Validators.required],
      districtId: ['', Validators.required],
      neighborhood: [''],
      gradeId: ['', Validators.required],
      divisionId: ['']
    });

    this.documentForm = this.fb.group({
      cvFile: [null],
      nationalIdImageFile: [null],
      videoLink: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]]
    });
  }

  private fetchGovernorates() {
    this.locationService.getGovernorates()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => this.governorates.set(data),
        error: (error) => console.error('Error fetching governorates:', error)
      });
  }

  private fetchStages() {
    this.stageService.getStages()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => this.grades.set(data),
        error: (error) => console.error('Error fetching stages:', error)
      });
  }

  private setupGovernorateChangeListener() {
    this.addressForm.get('governorateId')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((governorateId) => {
        const id = Number(governorateId);
        if (governorateId && !isNaN(id)) {
          this.fetchCitiesByGovernorate(id);
          this.addressForm.get('districtId')?.enable();
        } else {
          this.cities.set([]);
          this.addressForm.get('districtId')?.disable();
          this.addressForm.get('districtId')?.setValue('');
        }
      });
  }

  private fetchCitiesByGovernorate(id: number) {
    this.locationService.getCitiesByGovernorate(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => this.cities.set(data),
        error: (error) => console.error('Error fetching cities:', error)
      });
  }

  private setupGradeChangeListener() {
    this.addressForm.get('gradeId')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((gradeId) => {
        const id = Number(gradeId);
        if (gradeId && !isNaN(id)) {
          this.fetchDivisionsByStage(id);
          this.addressForm.get('divisionId')?.enable();
        } else {
          this.divisions.set([]);
          this.addressForm.get('divisionId')?.disable();
          this.addressForm.get('divisionId')?.setValue('');
        }
      });
  }

  private fetchDivisionsByStage(id: number) {
    this.stageService.getDivisionsByStage(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => this.divisions.set(data),
        error: (error) => console.error('Error fetching divisions:', error)
      });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      const maxSize = controlName === 'cvFile' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for CV, 5MB for image
      if (file.size > maxSize) {
        alert(`حجم الملف كبير جدًا. الحد الأقصى ${maxSize / (1024 * 1024)} ميجابايت.`);
        return;
      }
      this.documentForm.patchValue({ [controlName]: file });
    } else {
      this.documentForm.patchValue({ [controlName]: null });
    }
  }

  clearFile(controlName: string) {
    this.documentForm.patchValue({ [controlName]: null });
    const input = document.getElementById(controlName === 'cvFile' ? 'cv-upload' : 'national-id-upload') as HTMLInputElement;
    if (input) input.value = '';
  }

  getCurrentForm(): FormGroup {
    switch (this.currentStep) {
      case 1: return this.personalForm;
      case 2: return this.securityForm;
      case 3: return this.addressForm;
      case 4: return this.documentForm;
      default: return this.personalForm;
    }
  }

  nextStep() {
    const currentForm = this.getCurrentForm();
    if (currentForm.valid) {
      this.steps[this.currentStep - 1].completed = true;
      this.currentStep = Math.min(this.currentStep + 1, this.totalSteps);
      this.currentStepName.set(this.steps[this.currentStep - 1].title);
    } else {
      this.markFormGroupTouched(currentForm);
    }
  }

  prevStep() {
    this.currentStep = Math.max(this.currentStep - 1, 1);
    this.currentStepName.set(this.steps[this.currentStep - 1].title);
  }

  goToStep(step: number) {
    if (step <= this.currentStep || this.steps[step - 2]?.completed) {
      this.currentStep = step;
      this.currentStepName.set(this.steps[this.currentStep - 1].title);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
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
      if (field.errors['required']) return `حقل ${fieldName} مطلوب`;
      if (field.errors['email']) return 'الرجاء إدخال بريد إلكتروني صحيح';
      if (field.errors['minlength']) return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
      if (field.errors['pattern']) {
        if (fieldName === 'phone' || fieldName === 'parentPhone') return 'رقم الهاتف غير صالح';
        if (fieldName === 'password') return 'كلمة المرور يجب أن تحتوي على حرف واحد، رقم أو رمز خاص، و10 أحرف على الأقل';
        if (fieldName === 'videoLink') return 'رابط الفيديو غير صالح';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.personalForm.valid && this.securityForm.valid && this.addressForm.valid && this.documentForm.valid) {
      this.isSubmitting = true;
      const formData = new FormData();
      Object.keys(this.personalForm.value).forEach(key => {
        if (this.personalForm.value[key]) {
          formData.append(`personal.${key}`, this.personalForm.value[key]);
        }
      });
      Object.keys(this.securityForm.value).forEach(key => {
        if (this.securityForm.value[key]) {
          formData.append(`security.${key}`, this.securityForm.value[key]);
        }
      });
      Object.keys(this.addressForm.value).forEach(key => {
        if (this.addressForm.value[key]) {
          formData.append(`address.${key}`, this.addressForm.value[key]);
        }
      });
      const cvFile = this.documentForm.get('cvFile')?.value;
      if (cvFile) {
        formData.append('cvFile', cvFile);
      }
      const nationalIdImageFile = this.documentForm.get('nationalIdImageFile')?.value;
      if (nationalIdImageFile) {
        formData.append('nationalIdImageFile', nationalIdImageFile);
      }
      if (this.documentForm.value.videoLink) {
        formData.append('videoLink', this.documentForm.value.videoLink);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

    } else {
      this.markFormGroupTouched(this.personalForm);
      this.markFormGroupTouched(this.securityForm);
      this.markFormGroupTouched(this.addressForm);
      this.markFormGroupTouched(this.documentForm);
    }
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
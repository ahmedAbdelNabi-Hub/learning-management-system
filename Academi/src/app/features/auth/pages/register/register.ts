import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { LocationService } from '../../services/location.service';
import { IGovernorate } from '../../interface/locations/IGovernorate';
import { ICity } from '../../interface/locations/ICity';



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


  selectedFiles: { [key: string]: File | null } = {
    cvFile: null,
    nationalIdImageFile: null
  };

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit() {
    this.initializeForms();
    this.setupFormListeners();
    this.locationService.getGovernorates().subscribe(data => {
      this.governorates.set(data);
    });
    this.addressForm.get('governorateId')?.valueChanges.subscribe(value => {
      this.onGovernorateChange(value);
    });
  }
  onGovernorateChange(governorateId: string) {
    const id = Number(governorateId);
    if (!isNaN(id)) {
      this.locationService.getCitiesByGovernorate(id).subscribe(data => {
        this.cities.set(data);
      });
    }
  }


  initializeForms() {
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

  setupFormListeners() {
    this.addressForm.get('governorateId')?.valueChanges.subscribe((governorateId) => {
      if (governorateId) {
        this.addressForm.get('districtId')?.enable();
        this.addressForm.get('districtId')?.setValue('');
      } else {
        this.addressForm.get('districtId')?.disable();
        this.addressForm.get('districtId')?.setValue('');
      }
    });

    // Filter divisions based on grade selection
    this.addressForm.get('gradeId')?.valueChanges.subscribe((gradeId) => {
      if (gradeId) {
        this.addressForm.get('divisionId')?.enable();
        this.addressForm.get('divisionId')?.setValue('');
      } else {
        this.addressForm.get('divisionId')?.disable();
        this.addressForm.get('divisionId')?.setValue('');
      }
    });
  }



  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      // Optional: Add file size validation
      const maxSize = controlName === 'cvFile' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for CV, 5MB for image
      if (file.size > maxSize) {
        alert(`حجم الملف كبير جدًا. الحد الأقصى ${maxSize / (1024 * 1024)} ميجابايت.`);
        return;
      }
      this.selectedFiles[controlName] = file;
      this.documentForm.patchValue({ [controlName]: file });
    } else {
      this.selectedFiles[controlName] = null;
      this.documentForm.patchValue({ [controlName]: null });
    }
  }

  clearFile(controlName: string) {
    this.selectedFiles[controlName] = null;
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
  
      this.steps[this.currentStep - 1].completed = true;
      this.currentStep = Math.min(this.currentStep + 1, this.totalSteps);
      this.currentStepName.set(this.steps[this.currentStep - 1].title);
 
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

      // Personal Form
      Object.keys(this.personalForm.value).forEach(key => {
        if (this.personalForm.value[key]) {
          formData.append(`personal.${key}`, this.personalForm.value[key]);
        }
      });

      // Security Form
      Object.keys(this.securityForm.value).forEach(key => {
        if (this.securityForm.value[key]) {
          formData.append(`security.${key}`, this.securityForm.value[key]);
        }
      });

      // Address Form
      Object.keys(this.addressForm.value).forEach(key => {
        if (this.addressForm.value[key]) {
          formData.append(`address.${key}`, this.addressForm.value[key]);
        }
      });

      // Document Form
      if (this.selectedFiles['cvFile']) {
        formData.append('cvFile', this.selectedFiles['cvFile']);
      }
      if (this.selectedFiles['nationalIdImageFile']) {
        formData.append('nationalIdImageFile', this.selectedFiles['nationalIdImageFile']);
      }
      if (this.documentForm.value.videoLink) {
        formData.append('videoLink', this.documentForm.value.videoLink);
      }

      // Log form data for debugging
      console.log('Final FormData:');
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
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-account.html',
  styleUrls: []
})
export class TypeAccount {
  selectedType = signal('');

  constructor(
    private router: Router,
  ) { }

  selectType(type: string) {
    this.selectedType.set(type);
  }

  continue() {
    if (!this.selectedType) return;

    console.log('Continuing with account type:', this.selectedType);

    switch (this.selectedType()) {
      case 'student':
        this.router.navigate(['/register']);
        break;
      case 'instructor':
        this.router.navigate(['/register']);
        break;
      case 'tutor':
        this.router.navigate(['/register']);
        break;
      default:
        console.warn('Unknown account type:', this.selectedType);
        break;
    }
  }

  isSelected(type: string): boolean {
    return this.selectedType() === type;
  }

  goBack() {
    this.router.navigate(['/']);

  }
}
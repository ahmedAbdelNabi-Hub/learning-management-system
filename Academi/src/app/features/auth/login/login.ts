import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login  {

  protected readonly title = signal('الأكاديمية');
  protected showPassword = signal<boolean>(true);
  email = '';
  password = '';
  username = '';

  
  OnShowPassword() {
    this.showPassword.set(!this.showPassword());
  }

 

  onSubmit() {
    console.log('Submitted:', {
      email: this.email,
      password: this.password,
      username: this.username
    });
  }
}

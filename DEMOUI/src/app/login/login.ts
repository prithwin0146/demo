import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Enter email and password');
      return;
    }

    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login failed: no token received');
        }
      },
      error: () => {
        this.loading = false;
        alert('Invalid credentials');
      }
    });
  }
}

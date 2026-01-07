import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => alert('Login success'),
    error: () => alert('Invalid login')
    });
  }
}

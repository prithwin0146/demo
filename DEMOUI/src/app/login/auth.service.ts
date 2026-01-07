import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:5127/api/Users/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }
}

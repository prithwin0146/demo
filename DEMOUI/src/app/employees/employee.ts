import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'http://localhost:7087/api/Users';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<any[]>(this.apiUrl);
  }
  createEmployee(employee: any) {
  return this.http.post(this.apiUrl, employee);
}
getEmployee(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

updateEmployee(id: number, employee: any) {
  return this.http.put(`${this.apiUrl}/${id}`, employee);
}

}

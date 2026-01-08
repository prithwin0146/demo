import { Component } from '@angular/core';
import { EmployeeService } from '../employee';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css']
})
export class AddEmployee {
  name = '';
  email = '';
  role = '';

  constructor(private empService: EmployeeService, private router: Router) {}

  save() {
    const employee = {
      name: this.name,
      email: this.email,
      role: this.role
    };

    this.empService.createEmployee(employee).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => alert('Failed to add employee')
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-employee.html',
  styleUrls: ['./edit-employee.css']
})
export class EditEmployee implements OnInit {
  id!: number;
  name = '';
  email = '';
  role = '';

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.empService.getEmployee(this.id).subscribe({
      next: (emp) => {
        this.name = emp.name;
        this.email = emp.email;
        this.role = emp.role;
      },
      error: () => alert('Employee not found')
    });
  }

  update() {
    const employee = { name: this.name, email: this.email, role: this.role };

    this.empService.updateEmployee(this.id, employee).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => alert('Update failed')
    });
  }
}

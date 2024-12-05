import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public newUser: User = { name: '', email: '', password: '', role: 'user' };
  public confirmPassword = '';

  ngOnInit(): void {}

  saveUser(): void {
    if (!this.newUser.email || !this.newUser.name || !this.newUser.password) {
      swal.fire('Error', 'All fields are required', 'error');
      return;
    }
  
    this.authService.register(this.newUser).subscribe({
      next: () => {
        swal.fire('User created', 'User created successfully', 'success');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Unexpected error occurred';
        swal.fire('Error', errorMessage, 'error');
      },
    });
  }
}

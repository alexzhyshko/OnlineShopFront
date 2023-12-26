import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { UserService } from '../service/user/user.service';
import { UserDTO } from '../dto/account/UserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload: UserDTO;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.loginRequestPayload = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/'])
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.loginRequestPayload.email = this.loginForm.get('email')?.value
    this.loginRequestPayload.password = this.loginForm.get('password')?.value

    this.authService.login(this.loginRequestPayload)
      .subscribe(
        data => {
          this.userService.saveCurrentUser(data);
          this.router.navigate(['/'])
        },
        error => console.log("Login failed")
      )

  }

}

import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../dto/account/UserDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerRequestPayload: UserDTO;


  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/'])
    }

    this.registerRequestPayload = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.email]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  register() {
    this.registerRequestPayload.email = this.registerForm.get('email')?.value
    this.registerRequestPayload.password = this.registerForm.get('password')?.value
    this.registerRequestPayload.firstName = this.registerForm.get('firstName')?.value
    this.registerRequestPayload.lastName = this.registerForm.get('lastName')?.value

    this.authService.register(this.registerRequestPayload)
      .subscribe(
        data => {
          this.userService.saveCurrentUser(data);
          this.router.navigate(['/'])
        },
        error => console.log("Register failed")
      )
  }

}

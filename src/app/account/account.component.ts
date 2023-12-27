import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDTO } from '../dto/account/UserDTO';
import { UserService } from '../service/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddressDTO } from '../dto/account/AddressDTO';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  accountForm!: FormGroup;

  currentUser!: UserDTO;
  userData!: UserDTO;
  addressData!: AddressDTO;

  constructor(private userService: UserService, private httpClient: HttpClient) {

    this.currentUser = this.userService.getCurrentUser();

  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      email: new FormControl(this.currentUser.email, [Validators.required, Validators.email]),
      firstName: new FormControl(this.currentUser.firstName, [Validators.required, Validators.email]),
      lastName: new FormControl(this.currentUser.lastName, [Validators.required]),
      streetName: new FormControl(this.currentUser.address?.streetName, [Validators.required]),
      streetNumber: new FormControl(this.currentUser.address?.streetNumber, [Validators.required]),
      streetAdditive: new FormControl(this.currentUser.address?.streetAdditive, [Validators.required]),
      room: new FormControl(this.currentUser.address?.room, [Validators.required]),
      city: new FormControl(this.currentUser.address?.city, [Validators.required]),
      additionalInfo: new FormControl(this.currentUser.address?.additionalInfo, [Validators.required])
    })
  }

  changeData() {
    this.userData = {
      email: this.currentUser.email != null ? this.currentUser.email : this.accountForm.get('email')!.value,
      firstName: this.currentUser.firstName != null ? this.currentUser.firstName : this.accountForm.get('firstName')!.value,
      lastName: this.currentUser.lastName != null ? this.currentUser.lastName : this.accountForm.get('lastName')!.value,
    }

    this.addressData = {
      streetName: this.currentUser.address?.streetName != null ? this.currentUser.address?.streetName : this.accountForm.get('streetName')!.value,
      streetNumber: this.currentUser.address?.streetNumber != null ? this.currentUser.address?.streetNumber : this.accountForm.get('streetNumber')!.value,
      streetAdditive: this.currentUser.address?.streetAdditive != null ? this.currentUser.address?.streetAdditive : this.accountForm.get('streetAdditive')!.value,
      room: this.currentUser.address?.room != null ? this.currentUser.address?.room : this.accountForm.get('room')!.value,
      city: this.currentUser.address?.city != null ? this.currentUser.address?.city : this.accountForm.get('city')!.value,
      additionalInfo: this.currentUser.address?.additionalInfo != null ? this.currentUser.address?.additionalInfo : this.accountForm.get('additionalInfo')!.value
    }

    this.userData.address = this.addressData

    if (!this.userData.firstName || !this.userData.lastName || !this.userData.address?.streetName ||
      !this.userData.address?.streetNumber || !this.userData.address?.streetAdditive || !this.userData.address?.room
      || !this.userData.address?.city) {
      console.log("Please fill in all required fields")
    } else {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userService.getToken()}`
      });
      this.httpClient.put("http://localhost:8081/account/change", this.userData, {headers: headers}).subscribe(
        data => console.log("Personal Data updated"),
        error => error
      )
      this.httpClient.put("http://localhost:8081/account/address", this.addressData, {headers: headers}).subscribe(
        data => console.log("Address Data updated"),
        error => error
      )
      
    }


  }

}

import { Injectable } from '@angular/core';
import { UserDTO } from '../../dto/account/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveCurrentUser(userDTO: UserDTO) {
    localStorage.setItem('currentUser', JSON.stringify(userDTO))
    this.saveToken(userDTO.token!);
  }

  getCurrentUser(): UserDTO {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }
  
  isLoggedIn():boolean {
    return localStorage.hasOwnProperty('token')
  }

  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

}

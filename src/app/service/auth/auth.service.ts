import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../../dto/account/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(loginPayload: UserDTO) {
    return this.httpClient.post<UserDTO>('http://localhost:8081/auth/login', loginPayload);
  }

  register(registerPayload: UserDTO) {
    return this.httpClient.post<UserDTO>('http://localhost:8081/auth/register', registerPayload);
  }

}

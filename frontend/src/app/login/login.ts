import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicCodedAuthentication } from '../service/basic-coded-authentication';





@Component({
  selector: 'app-login',
  imports: [FormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private basicAuthenticationService: BasicCodedAuthentication) {
  }
  username = 'user';
  password = 'password';
  invalidLogin: boolean = false

  router = inject(Router);
 
  handleBasicAuthLogin() {
    
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/list-user'])
          this.invalidLogin = false
        },
        error => {
          console.log(error)
          this.invalidLogin = true
        }
      )
  }

}

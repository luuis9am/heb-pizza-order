import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {UserToken} from "../shared/models/user-token.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userNameInput?: String;
  userPasswordInput?: String;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  loginFormGroup = this.formBuilder.group({
    username: [this.userNameInput, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9_]*$')
      ]],
    password: [this.userPasswordInput, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9_]*$')
    ]]
  })

  async submitLoginForm(loginFormValue: FormGroup): Promise<void> {
    await this.requestToken(loginFormValue.value)
      .then((userToken: UserToken) => {
        localStorage.setItem('userToken', <string>userToken.access_token);
        console.log(userToken.access_token);
        // add snackbar response and direct user to orders page
      })
      .catch(error => {
        console.error(error);
        // add snackbar for failed attempt
      })
  }

  async requestToken(loginFormValue: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authService.authenticateUser(JSON.stringify((loginFormValue.valueOf()))).subscribe(
        response => resolve(response),
        error => reject(error)
      )
    })
  }
}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {UserToken} from "../shared/models/user-token.model";
import {Router} from "@angular/router";
import {SnackbarService} from "../shared/services/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userNameInput: String = '';
  userPasswordInput: String = '';

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

  constructor(private formBuilder: FormBuilder,
              private readonly router: Router,
              private snackbarService: SnackbarService,
              private authService: AuthService) {
  }

  async submitLoginForm(loginFormValue: FormGroup): Promise<void> {
    await this.authService.requestToken(loginFormValue.value)
      .then((userToken: UserToken) => {
        localStorage.setItem('userToken', <string>userToken.access_token);
        this.snackbarService.openSuccessSnackBar('Successful login',
          "Welcome, " + loginFormValue.value.username)
        this.router.navigate(['order']).then();
      })
      .catch((error: any) => {
        console.error(error);
        this.snackbarService.openErrorSnackBar('Invalid Credentials', error.error.msg)
      })
  }
}

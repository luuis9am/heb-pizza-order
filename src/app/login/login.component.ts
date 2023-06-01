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

  loginFormGroup = this.formBuilder.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9_]*$')
    ]],
    password: ['', [
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

  submitLoginForm(loginFormValue: FormGroup): void {
    this.authService.requestToken(loginFormValue.value).subscribe(
      (userToken: UserToken) => {
        localStorage.setItem('userToken', <string>userToken.access_token);
        this.snackbarService.openSuccessSnackBar('Successful login',
          "Welcome, " + loginFormValue.value.username)
        this.router.navigate(['order']).then();
      },
      (error: any) => {
        console.error(error);
        this.snackbarService.openErrorSnackBar('Invalid Credentials', error.error.msg)
      }
    );
  }
}

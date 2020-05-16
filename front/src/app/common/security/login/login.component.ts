import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../user/authentication.service';
import {AuthorizationService} from '../user/authorization.service';
import {Router} from '@angular/router';
import {BackofficeUser} from '../user/backoffice-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: BackofficeUser = new BackofficeUser();
  loading = false;
  errorExists = false;
  errorMessage: string;
  loginIncorrect = false;
  redirectUrl: string;


  @ViewChild('loginForm') public loginForm: NgForm;

  constructor(private authenticationService: AuthenticationService,
              private authorizationService: AuthorizationService, private router: Router,
              ) {
  }


  getRedirectUrl() {
    this.redirectUrl = localStorage.getItem('redirecturl');
    localStorage.removeItem('redirecturl');
  }

  ngOnInit() {
    this.authorizationService.removeLocalStorageItems();
  }


  login() {
    this.loading = true;
    this.errorExists = false;
    this.getRedirectUrl();
    this.loginIncorrect = false;
    this.authenticationService.login(this.user)
      .subscribe(
        responseLogin => {
          const token = responseLogin.id;
          const expiredTokenDate = this.authorizationService.setExpiredTokenDate(responseLogin.ttl, new Date());
          const authenticationObject = {
            accessToken: token,
            expiredTokenDate: expiredTokenDate,
          };
         localStorage.setItem('authenticationObject', JSON.stringify(authenticationObject));

              this.router.navigate(['/dashboard']);
              console.log('navigating to dashboard');


        },
        err => {

          if (err.status === 401 && err.error.error.code === 'MAX_ATTEMPTS_REACHED') {

            this.loginIncorrect = true;
            this.errorMessage = 'You tried to login many times with incorrect credentials. Please contact your support.';

          } else if (err.status === 401 && err.error.error.code === 'LOGIN_FAILED') {

            this.loginIncorrect = true;
            this.errorMessage = 'Please verify your e-mail or password';

          } else {
            this.errorExists = true;
          }
          this.loading = false;
        }
      );
  }


}

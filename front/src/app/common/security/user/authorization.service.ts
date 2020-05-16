import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import * as crypto from 'crypto-js';
import {isItNullOrUndefined} from '../../utils/functions';
import {CanActivateChild} from '@angular/router';

@Injectable()
export class AuthorizationService implements CanActivate, CanActivateChild {


  constructor(private router: Router) {

  }


  getLocalStorageObject(): any {
    const authenticationObject = localStorage.getItem('authenticationObject');
    if (!isItNullOrUndefined(authenticationObject)) {
      return JSON.parse(authenticationObject);
    } else {
      return null;
    }

  }

  setExpiredTokenDate(timeToLive: number, tokenDate: Date): any {
    const secondsTokenDate = tokenDate.getTime() / 1000;
    const expiredDateInSeconds = secondsTokenDate + timeToLive;
    const expiredTokenDate = new Date(1970, 0, 1); // Epoch
    expiredTokenDate.setSeconds(expiredDateInSeconds);
    return expiredTokenDate;
  }

  getExpiredTokenDate(): any {
    const authenticationObject = this.getLocalStorageObject();

    if (!isItNullOrUndefined(authenticationObject)) {
      return authenticationObject['expiredTokenDate'];
    } else {
      return null;
    }
  }

  getAccesToken(): any {
    const authenticationObject = this.getLocalStorageObject();

    if (!isItNullOrUndefined(authenticationObject)) {
      return authenticationObject['accessToken'];
    } else {
      return null;
    }
  }


  getEmail(): any {
    const authenticationObject = this.getLocalStorageObject();

    if (!isItNullOrUndefined(authenticationObject)) {
      return authenticationObject['email'];
    } else {
      return '';
    }

  }

  isNotExpiredDate() {
    const expiredDate = this.getExpiredTokenDate();
    if (!isItNullOrUndefined(expiredDate)) {
      const dateExpired = new Date(expiredDate);
      const actualDate = new Date();
      if (actualDate <= dateExpired) {
        return true;

      } else {

        return false;

      }
    } else {
      return false;
    }
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }


  checkLogin(): boolean {
    let isAuth: boolean;
    isAuth = true;
    const isNotExpiredDate = this.isNotExpiredDate();
    if (isNotExpiredDate) {
      const token = this.getAccesToken();
      if (token === null) {
        isAuth = false;
        this.router.navigate(['/login']);
      } else {

        isAuth = true;

      }
    } else {
      isAuth = false;
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

  removeLocalStorageItems() {
    localStorage.removeItem('authenticationObject');
    localStorage.removeItem('role');
    localStorage.removeItem('avatar');
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }




}

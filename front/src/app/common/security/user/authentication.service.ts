import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthorizationService} from './authorization.service';
import {BackofficeUser} from './backoffice-user';

@Injectable()
export class AuthenticationService {

    url = environment.serverUrl;

    constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }


    login(user: BackofficeUser): Observable<any> {
        return this.http.post(this.url + '/BackofficeUsers/securelogin', user);
    }


    logout() {
        return this.http.post(this.url + '/BackofficeUsers/logout', this.authorizationService.getAccesToken());
    }


}

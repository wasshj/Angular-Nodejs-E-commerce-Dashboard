import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AuthorizationService} from '../common/security/user/authorization.service';


@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url = environment.serverUrl;
  constructor(private http: HttpClient , private authorizationService: AuthorizationService) { }

  public getDictionaries(): Observable<any> {
    return this.http.get(this.url + '/dictionaries', this.authorizationService.getAccesToken());
  }

  public getDictionariesForHome(): Observable<any> {
    return this.http.get(this.url + '/dictionaries');
  }

  public saveEdit(dictionary: any): Observable<any> {
    return this.http.put(this.url + '/dictionaries', dictionary, this.authorizationService.getAccesToken());
  }

  delete(dictionary: any) {
    return this.http.delete(this.url + '/dictionaries/' + dictionary.id, this.authorizationService.getAccesToken());
  }
}

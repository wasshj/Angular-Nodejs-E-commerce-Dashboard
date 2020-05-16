import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AuthorizationService} from '../common/security/user/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardProductService {
  url = environment.serverUrl;

  constructor(private http: HttpClient , private authorizationService: AuthorizationService) { }

  getProducts() {
    return this.http.get(this.url + '/products', this.authorizationService.getAccesToken());
  }

  getProductsForHome() {
    return this.http.get(this.url + '/products');
  }

  saveProduct(product: any) {
    return this.http.put(this.url + '/products', product, this.authorizationService.getAccesToken());
  }

  deleteProduct(product: any) {
    return this.http.delete(this.url + '/products/' + product.id, this.authorizationService.getAccesToken());
  }

}

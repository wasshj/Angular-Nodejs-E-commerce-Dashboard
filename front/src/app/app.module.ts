
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {BasicLayoutComponent} from './basic-layout/basic-layout.component';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {LoginComponent} from './common/security/login/login.component';
import {AuthorizationService} from './common/security/user/authorization.service';
import {AuthenticationService} from './common/security/user/authentication.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    BasicLayoutComponent,
    DictionaryComponent,
    ProductComponent,
    HomeComponent,
    DashboardProductComponent,
  ],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
      ReactiveFormsModule,
    HttpModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    RouterModule.forRoot(ROUTES),
      HttpClientModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
  ],
  providers: [AuthenticationService,
    AuthorizationService
  ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

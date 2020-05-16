import {NotFoundComponent} from './common/not-found/not-found.component';
import {AuthorizationService} from './common/security/user/authorization.service';
import {LoginComponent} from './common/security/login/login.component';
import {Routes} from '@angular/router';
import {BasicLayoutComponent} from './basic-layout/basic-layout.component';
import {HomeComponent} from './home/home.component';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {DashboardProductComponent} from './dashboard-product/dashboard-product.component';

export const ROUTES: Routes = [
  {path: 'dashboard', redirectTo: 'dashboard/dictionaries', pathMatch: 'full'},
  {path: '', redirectTo: 'dashboard/dictionaries', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: BasicLayoutComponent,
    canActivate: [AuthorizationService],
    canActivateChild: [AuthorizationService],
    children: [
      {path: 'dictionaries', component: DictionaryComponent},
      {path : 'products', component : DashboardProductComponent}
    ]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

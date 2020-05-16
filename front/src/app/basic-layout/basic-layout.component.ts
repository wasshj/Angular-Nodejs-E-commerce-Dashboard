import {Component, DoCheck, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../common/security/user/authorization.service';
import {AuthenticationService} from '../common/security/user/authentication.service';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit, DoCheck, AfterViewInit {

  userName: string;
  windowsWidth: number;


  @ViewChild('sidenav') sideNavigation: any;

  constructor(private router: Router, private authorizationService: AuthorizationService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.setUserName();

  }

  ngAfterViewInit() {
    this.windowsWidth = window.innerWidth;
  }


  ngDoCheck() {
    const currenUsername = this.authorizationService.getEmail();
    if (currenUsername !== this.userName) {
      this.setUserName();
    }


  }


  setUserName() {
    this.userName = this.authorizationService.getEmail();
  }

  logout(): void {
    this.authorizationService.removeLocalStorageItems();
    this.router.navigate(['/login']);


  }




  slideNav() {
    if (this.windowsWidth < 1441) {
      this.sideNavigation.hide();
    }
  }



}

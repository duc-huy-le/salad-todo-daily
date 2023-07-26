import { Component, OnInit } from '@angular/core';
import { USER_INFO } from 'src/app/constants/constants';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfo: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userInfo = JSON.parse(localStorage.getItem(USER_INFO)!)?.data;
  }

  logout(): void {
    this.authService.logout();
  }

}

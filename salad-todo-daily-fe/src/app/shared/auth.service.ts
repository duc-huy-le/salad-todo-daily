import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum Role {
  Admin = 0,
  User = 1,
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_INFO = 'TODO_DAILY_USER_INFO';
  loginUrl = 'http://localhost:3000/account/login';
  checkSessionUrl = 'http://localhost:3000/user/info';
  loginSuccess: boolean = false;
  role?: Role;
  userInfo: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private msg: NzMessageService
  ) {
    if(this.getJwtToken()) this.loginSuccess = true;
    // this.getUserInfo().toPromise().then((res) => {
    //   debugger;
    // })
    this.getUserInfo().toPromise();
  }
  login(loginData: any): Observable<any> {
    return this.http.post(this.loginUrl, loginData).pipe(
      tap((res: any) => {
        if (res.status) {
          this.storeTokens(res.token);
          this.storeUserInfo(res);
          this.loginSuccess = true;
          this.userInfo = res.data;
          this.router.navigate(['/home/dashboard']);
        }
      })
    );
  }

  getUserInfo(): Observable<any> {
    const token = this.getJwtToken();

    const headers = { authorization: token };
    const options = { headers: headers };
    return this.http.get(this.checkSessionUrl, options).pipe(
      tap((res: any) => {
        if (res.status) {
          this.userInfo = res.data;
        } else {
          this.msg.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
          this.logout();
        }
      })
    );
  }

  checkSession() {
    const token = this.getJwtToken();
    if (token) {
      this.getUserInfo();
    }
  }

  isAuthenticated() {
    return this.loginSuccess;
  }

  private storeTokens(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  private storeUserInfo(data: any): void {
    localStorage.setItem(this.USER_INFO, JSON.stringify(data));
  }
  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN)!;
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.loginSuccess = false;
    this.router.navigate(['/login']);
  }
}

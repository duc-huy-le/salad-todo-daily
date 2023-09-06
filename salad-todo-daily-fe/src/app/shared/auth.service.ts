import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JWT_TOKEN, USER_INFO } from '../constants/constants';
import { environment } from 'src/environments/environment';

export enum Role {
  Admin = 0,
  User = 1,
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = `${environment.apiBaseUrl}/account/login`;
  checkSessionUrl = `${environment.apiBaseUrl}/user/info`;
  loginSuccess: boolean = false;
  role?: Role;
  userInfo: any;
  private userInfoSubject = new Subject<string>();
  userInfo$ = this.userInfoSubject.asObservable();
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
          this.userInfo$ = res.data;
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
    localStorage.setItem(JWT_TOKEN, token);
  }
  private storeUserInfo(data: any): void {
    localStorage.setItem(USER_INFO, JSON.stringify(data));
  }
  getJwtToken(): string {
    return localStorage.getItem(JWT_TOKEN)!;
  }

  logout() {
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(USER_INFO);
    this.loginSuccess = false;
    this.router.navigate(['/login']);
  }
}

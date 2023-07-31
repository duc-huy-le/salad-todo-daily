import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private msg: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  login(){
    this.authService.login(this.loginForm.value).toPromise().then((res) => {
      if(!res.status) {
        this.msg.error("Tài khoản hoặc mật khẩu không chính xác!");
      } else {
        this.msg.success("Đăng nhập thành công");
      }
    });
  }

}

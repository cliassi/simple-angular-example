import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {
    username: 'jaman2',
    password: '12we!Ad@dff',
  } as User;
  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    let httpcall = this.auth.login(this.user);
    httpcall.subscribe(
      (res: any) => {
        this.storage.set('access_token', res.accessToken);
        this.router.navigate(["/tasks"])
      },
      (error) => {
        console.log(error);
        alert(error.error.message);
      }
    );
  }
}

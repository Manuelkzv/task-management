import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.initLoggedIn();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.storageService.getUser();
    }
  }

  initLoggedIn(): void {
    this.userService.isLoggedAs.subscribe((username) => {
      console.log('isLogged', username);
      this.isLoggedIn = !!username;
    });
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (userData) => {
        const helper = new JwtHelperService();
        const user = helper.decodeToken(userData?.token);

        console.log('LoginComponent:onSubmit():userData:user', userData, user);
        this.storageService.saveUser({ ...userData, id: user?.userId });

        this.isLoginFailed = false;
        this.userService.changeIsLoggedAs(userData.username);
        this.user = userData;

        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}

import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private userService: UserService,
    private eventBusService: EventBusService,
  ) {}

  ngOnInit(): void {
    this.userService.isLoggedAs.subscribe(
      (username) => (this.username = username),
    );
  }

  ngAfterContentInit(): void {
    this.isLoggedIn = this.isLoggedIn || this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      try {
        this.username = user.username;
      } catch (error) {
        console.log('AppComponent:ngOnInit():error', error);
      }
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        window.location.reload();
        this.storageService.clean();
        console.log(err);
      },
    });
  }
}

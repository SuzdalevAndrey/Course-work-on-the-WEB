import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  isLoggedIn: boolean = false;
  user!: User;

  isSettingsOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {}
  
  toggleSettingsOnMouseEnter(): void {
    this.isSettingsOpen = true;
  }

  closeSettingsOnMouseLeave(): void {
    this.isSettingsOpen = false;
  }
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.user=this.usersService.getCurrentUser();
  }

  routerLogin() {
    this.router.navigate(['/auth/login']);
  }

  LogOut() {
    this.authService.logout();
  }
  
  searchInputValueHelp(name: string) {
    this.changeSearchInputH.emit(name);
  }
  @Output() changeSearchInputH: EventEmitter<string> = new EventEmitter<string>();
}

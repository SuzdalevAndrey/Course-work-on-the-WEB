import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  
  user!: User;

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UsersService) {}
  
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.user=this.authService.getCurrentUser();
  }

  routerLogin() {
    this.router.navigate(['/auth/login']);
  }

  LogOut() {
    this.authService.logout();
  }

  deleteUser(){
    this.authService.logout();
    if(this.user.id!==undefined){
      this.userService.deleteUserById(this.user.id).subscribe(      () => {
        console.log('Пользователь успешно удален');
      },
      (error) => {
        console.error('Ошибка при удалении пользователя', error);
      });
    }
  }

}

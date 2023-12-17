import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  constructor(private usersService: UsersService, private router:Router) {}

  ngOnInit() {
    this.user = this.usersService.getCurrentUser();

    this.form = new FormGroup({
      'oldPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'newPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const oldPassword = this.form.get('oldPassword')?.value;      ;
      const newPassword = this.form.get('newPassword')?.value;
      const confirmPassword = this.form.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        this.form.setErrors({ passwordMismatch: true });
        return;
      }

      if (oldPassword!==this.user.password) {
        this.form.setErrors({ invalidOldPassword: true });
        return;
      }

      if (newPassword === confirmPassword && oldPassword===this.user.password) {
        if(this.user.id !==undefined){
          this.user.password=newPassword;
          this.usersService.updataUser(this.user.id, this.user).subscribe(response => {
            this.router.navigate(['/system/job-search-add'],{
              queryParams:{
                nowCanLogin: true
              }
            })
          });     
        }
      } else {
        console.log("Ошибка!");
      }
    }
  }
}

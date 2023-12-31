import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  isLoggedIn: boolean = false;
  form!: FormGroup;
  constructor(private usersService:UsersService, private router:Router, public autorization:AuthService){}
  ngOnInit() {
    this.form = new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });

    this.autorization.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if(this.isLoggedIn){
      this.router.navigate(['/system/job-search-add']);
    }
  }
  onSubmit(){
    const {name,email,password} = this.form.value;
    const user = new User(name,email,password);
    this.usersService.createNewUser(user).subscribe((user:User)=>{
        this.router.navigate(['/auth/login'],{
          queryParams:{
            nowCanLogin: true
          }
        })
    });
  }
  
  forbiddenEmail(control:FormControl):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.usersService.getUserByEmail(control.value).subscribe((user:User|undefined)=>{
        if(user){
          resolve({forbiddenEmail:true});
        }
        else{
          resolve(null);
        }
      })
    });
  }

}

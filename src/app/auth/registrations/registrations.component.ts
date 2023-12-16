import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  form!: FormGroup;
  constructor(private usersService:UsersService,
    private router:Router){}
  ngOnInit() {
    this.form = new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'email': new FormControl(null, [Validators.required,Validators.email],[this.forbiddenEmail.bind(this)] as AsyncValidatorFn[]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });
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

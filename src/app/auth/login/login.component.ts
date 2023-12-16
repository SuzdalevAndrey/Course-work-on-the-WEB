import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/user.service';
import { ToolBarComponent } from '../../system/components/tool-bar/tool-bar.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message!: Message;
  constructor(
    private usersService:UsersService,
    private router:Router,
    private route:ActivatedRoute,
    public autorization:AuthService){}
  ngOnInit(){
    this.message = new Message('danger',' ');

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params:Params)=>{
      if(params['nowCanLogin']) {
        this.showMessage({
          text: 'Теперь вы можете зайти в систему',
          type: 'success'
        });
      }
    })
  }
  private showMessage(message:Message){
    this.message = message;
    window.setTimeout(()=> {
      this.message.text = ' ';
    },5000);
  }
  onSubmit(){
    const formData:User = this.form.value;
  
    this.usersService.getUserByEmail(formData.email).subscribe((user:User|undefined)=> {
      if(user){
        if(user.password === formData.password){
          this.message.text =''
          window.localStorage.setItem('email',JSON.stringify(user));
          console.log(JSON.stringify(user));
          this.autorization.login();
          this.router.navigate(['/system/job-search-add']);
        }
        else{
          this.showMessage({
            text: 'Пароль не верный',
            type:'danger'
          });
        }
      }
      else{
        this.showMessage({
          text: 'Такого пользователя не существует',
          type: 'danger'
        });
      }
    });
  }
}

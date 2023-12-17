import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  @Input() countJob: number | undefined;

  isEditing: boolean = false;

  user!: User;

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private authService : AuthService) {}

  ngOnInit() {
    this.user=this.usersService.getCurrentUser();
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber],
      experience: [this.user.experience],
      jobSearch: [this.user.jobSearch]
    });
  }
  startEditing(): void {
    this.isEditing = true;
  }
  cancelEditing(): void {
    this.userForm.reset({
      name: this.user.name,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      experience: this.user.experience,
      jobSearch: this.user.jobSearch
    });
    this.isEditing = false;
  }
  saveUser() {
    if (this.userForm.valid) {
      const {name,email,phoneNumber,experience,jobSearch} = this.userForm.value;
      this.user.name=name;
      this.user.email=email;
      this.user.phoneNumber=phoneNumber;
      this.user.experience=experience;
      this.user.jobSearch=jobSearch;
      console.log(phoneNumber,experience,jobSearch);
      if(this.user.id !== undefined)
        this.usersService.updataUser(this.user.id, this.user).subscribe();
      localStorage.setItem('email',JSON.stringify(this.user));
    }
    this.isEditing = false;
  }
}

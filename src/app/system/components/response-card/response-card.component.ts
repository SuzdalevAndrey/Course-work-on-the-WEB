import { Component, Input, OnInit } from '@angular/core';
import { Responses } from 'src/app/shared/models/job.model';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss']
})
export class ResponseCardComponent implements OnInit{
  @Input() response: Responses | undefined;
  @Input() nameJob: string | undefined;
  user!:User;
  
  showAdditionalInfo: boolean = false;

  constructor(private userService:UsersService){}

  ngOnInit(): void {
    if (this.response?.userIdResponses !== undefined) {
      this.userService.getUserById(this.response.userIdResponses).subscribe((user: User) => {
        console.log(this.response?.userIdResponses);
        this.user = user;
      });
    }  
  }

  toggleAdditionalInfo() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }
}

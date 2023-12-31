import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { JobModel, Responses } from 'src/app/shared/models/job.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JobService } from 'src/app/shared/services/job.service';
import { UsersService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Output() jobDeleted = new EventEmitter<void>();
  @Input() card: JobModel = {
    userId: -100,
    id: 1,
    nameWork: "Новая вакансия",
    company: "Компания",
    salary: "1000000",
    city: "НН",
    additionalInformation: "",
    responses: [],
  };

  isLoggedIn: boolean = false;

  user!: User;
  isResponse: boolean = false;

  constructor(public router: Router, public usersService: UsersService, public jobService: JobService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user=this.usersService.getCurrentUser();

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.user && this.user.id !== undefined && this.user.email !== undefined && this.card) {
      this.isResponse = this.card.responses.some(res => res.userIdResponses === this.user.id);
    }
  }

  deleteJob() {
    if (this.card.id !== undefined){
      this.jobService.deleteJobById(this.card.id).subscribe(() => {
        console.log('Вакансия успешно удалена');
        this.jobDeleted.emit();
      },
      (error) => {
        console.error('Ошибка при удалении вакансии', error);
      });
    }
  }

  submitResponse() {
    if (this.user.id !== undefined && this.user.email !== undefined) {
      const response: Responses = {
        userIdResponses: this.user.id,
        date: new Date()
      };
      if (this.card.id !== undefined) {
        if (!this.isResponse) {
          this.card.responses.push(response);
          this.jobService.updateJob(this.card.id, this.card).subscribe();
        } else {
          console.warn('Пользователь уже откликнулся на эту вакансию');
        }
      }
    }
  }

  submitEdit(){
    this.router.navigate(['/system','add-edit-page'], {
      queryParams: {
        card: JSON.stringify(this.card)
      }
    });
  }
}

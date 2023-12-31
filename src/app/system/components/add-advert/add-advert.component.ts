import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobModel } from 'src/app/shared/models/job.model';
import { User } from 'src/app/shared/models/user.model';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent {
  user!: User;
  form!: FormGroup;
  constructor(private jobsService:JobService,
    private router:Router){}
  ngOnInit() {
    this.form = new FormGroup({
      'nameJob':new FormControl(null,[Validators.required]),
      'сompany': new FormControl(null, [Validators.required]),
      'city': new FormControl(null,[Validators.required]),
      'salary': new FormControl(null,[Validators.required]),
      'additionalInformation': new FormControl(null)
    });
  }
  userId!:any;
  onSubmit(){
    const userDataString = localStorage.getItem('email');
    if (userDataString !== null) {
      this.user = JSON.parse(userDataString);
      this.userId=this.user.id;
    }
    const {nameJob,сompany,city,salary,additionalInformation} = this.form.value;
    const job = new JobModel(this.userId,nameJob,сompany,city,salary,additionalInformation);
    this.jobsService.createNewJob(job).subscribe((job:JobModel)=>{
        this.router.navigate(['/system/job-search-add'])
    });
  }
}

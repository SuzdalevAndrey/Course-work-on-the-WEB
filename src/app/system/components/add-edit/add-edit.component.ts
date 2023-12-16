import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobModel } from 'src/app/shared/models/job.model';
import { User } from 'src/app/shared/models/user.model';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {
  card!:JobModel;

  user!: User;
  form!: FormGroup;
  constructor(private jobsService:JobService,
    private router:Router, private route: ActivatedRoute){}
  ngOnInit() {
    this.form = new FormGroup({
      'nameJob':new FormControl(null,[Validators.required]),
      'сompany': new FormControl(null, [Validators.required]),
      'city': new FormControl(null,[Validators.required]),
      'salary': new FormControl(null,[Validators.required]),
      'additionalInformation': new FormControl(null)
    });
    this.route.queryParams.subscribe(params => {
      const cardString = params['card'];
      if (cardString) {
        this.card = JSON.parse(cardString);
        this.form.patchValue({
          nameJob: this.card.nameWork,
          сompany: this.card.company,
          city: this.card.city,
          salary: this.card.salary,
          additionalInformation: this.card.additionalInformation
        });
      }
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
    if(this.card.id!==undefined){
      this.jobsService.updateJob(this.card.id, job).subscribe((job:JobModel)=>{
        this.router.navigate(['/system/job-search-add'],{})
    });
    }
  }
}

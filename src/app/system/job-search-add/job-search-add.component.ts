import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/services/job.service';
import { JobModel } from 'src/app/shared/models/job.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlurService } from 'src/app/shared/services/blur.sevice';

@Component({
  selector: 'app-job-search-add',
  templateUrl: './job-search-add.component.html',
  styleUrls: ['./job-search-add.component.scss']
})
export class JobSearchAddComponent implements OnInit {
  cardAdds: JobModel[] = [];

  isBlurred: boolean = false;

  isLoggedIn: boolean = false;

  searchInputValue = "";
  
  constructor(private authService: AuthService, private jobCard: JobService, private blurService:BlurService) {}

  changeSearchInput(text: string) {
    this.searchInputValue = text;
  }

  handleJobDeleted() {
    this.jobCard.getJobs().subscribe((jobs: JobModel[]) => {
      this.cardAdds = jobs;
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.jobCard.getJobs().subscribe((jobs: JobModel[]) => {
      this.cardAdds = jobs;
    });
    this.blurService.isBlurred$.subscribe((isBlurred) => {
      this.isBlurred = isBlurred;
    });
  }
}

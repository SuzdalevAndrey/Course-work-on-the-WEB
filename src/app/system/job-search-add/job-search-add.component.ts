import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/services/job.service';
import { JobModel } from 'src/app/shared/models/job.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-job-search-add',
  templateUrl: './job-search-add.component.html',
  styleUrls: ['./job-search-add.component.scss']
})
export class JobSearchAddComponent implements OnInit {
  cardAdds: JobModel[] = [];

  isLoggedIn: boolean = false;

  searchInputValue = "";
  
  constructor(private authService: AuthService, private jobCard: JobService) {}

  changeSearchInput(text: string) {
    this.searchInputValue = text;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.jobCard.getJobs().subscribe((jobs: JobModel[]) => {
      this.cardAdds = jobs;
    });
  }
}

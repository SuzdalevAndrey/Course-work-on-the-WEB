import { Component, OnInit } from '@angular/core';
import { JobModel, Responses } from 'src/app/shared/models/job.model';
import { User } from 'src/app/shared/models/user.model';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss']
})
export class PersonalAccountComponent implements OnInit {
  cardJobsUser: JobModel[] = [];

  user!: User;

  constructor(public jobCard: JobService) {}

  searchInputValue = "";

  activeTab: string = 'tab3';

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }
  
  changeSearchInput(text: string) {
    this.searchInputValue = text;
  }

  filterType: 'applied' | 'posted' = 'posted';

  showApplied() {
    this.filterType = 'applied';
  }

  handleJobDeleted() {
    this.jobCard.getJobs().subscribe((jobs: JobModel[]) => {
      this.cardJobsUser = jobs;
    });
  }

  getResponsesForJob(job: JobModel): Responses[] {
    return job.responses;
  }
  
  showPosted() {
    this.filterType = 'posted';
  }

  filteredCards(): JobModel[] {
    if (this.filterType === 'applied') {
      
    } else if (this.filterType === 'posted') {
      return this.cardJobsUser;
    }
  
    return [];
  }
  
  ngOnInit(): void {
    const userDataString = localStorage.getItem('email');
    if (userDataString !== null) {
      this.user = JSON.parse(userDataString);
      if (this.user.id !== undefined) {
        this.jobCard.getJobsByUseryId(this.user.id).subscribe((jobs: JobModel[]) => {
          this.cardJobsUser = jobs;
        });
      }
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchAddComponent } from './job-search-add.component';

describe('JobSearchAddComponent', () => {
  let component: JobSearchAddComponent;
  let fixture: ComponentFixture<JobSearchAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSearchAddComponent]
    });
    fixture = TestBed.createComponent(JobSearchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

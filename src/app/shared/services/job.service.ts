import {Injectable} from '@angular/core'
import { catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
import {map, Observable, tap} from 'rxjs'
import { JobModel, Responses } from '../models/job.model'

@Injectable()
export class JobService {
  constructor(private http: HttpClient) {}

  jobs: JobModel[] = []

  getJobs(): Observable<JobModel[]> {
    return this.http.get<JobModel[]>('http://localhost:3000/jobs').pipe(
      tap(jobs => this.jobs = jobs)
    )
  }
  
  getJobsById(id:number): Observable<JobModel>{
    return this.http.get<JobModel>(`http://localhost:3000/jobs/${id}`);
  }

  getJobsByUseryId(userId:number): Observable<JobModel[]>{
    return this.http.get<JobModel[]>(`http://localhost:3000/jobs?userId=${userId}`);
  }

  createNewJob(job: JobModel):Observable<JobModel> {
    return this.http.post<JobModel>(`http://localhost:3000/jobs`,job).pipe(map(response=>response));
  }

  deleteJobById(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/jobs/${id}`);
  }
  

  updateJob(id: number, job: JobModel): Observable<JobModel> {
    return this.http.put<JobModel>(`http://localhost:3000/jobs/${id}`, job)
      .pipe(
        tap(updatedJob => {
          const index = this.jobs.findIndex(job => job.id === id);
          if (index !== -1) {
            this.jobs[index] = updatedJob;
          }
        }),
        catchError(error => {
          console.error('Ошибка при добавлении отклика:', error);
          throw error;
        })
      );
  }

}
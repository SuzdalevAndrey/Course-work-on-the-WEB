import { Pipe, PipeTransform } from '@angular/core';
import { JobModel } from 'src/app/shared/models/job.model';

@Pipe({
  name: 'filterCard'
})
export class FilterCardPipe implements PipeTransform {
  transform(job: JobModel[], search: string): JobModel[] {
    if (search.length === 0) return job;
    
    return job.filter(p => 
      p.nameWork && p.nameWork.toLowerCase().includes(search.toLowerCase())
    );
  }
}

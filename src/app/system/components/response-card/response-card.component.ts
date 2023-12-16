import { Component, Input } from '@angular/core';
import { Responses } from 'src/app/shared/models/job.model';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss']
})
export class ResponseCardComponent {
  @Input() response: Responses | undefined;
  @Input() nameJob: string | undefined;
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchInputValue: string = '';
  @Output() changeInputValue: EventEmitter<string> = new EventEmitter<string>();

  emitInputChange() {
    this.changeInputValue.emit(this.searchInputValue);
  }
}

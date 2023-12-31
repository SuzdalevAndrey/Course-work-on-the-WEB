import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BlurService } from 'src/app/shared/services/blur.sevice';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {  
  searchInputValue: string = '';

  isMainPage: boolean = true;

  @Output() changeInputValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private blurService:BlurService) {}

  NoInputChange(){
    if(this.searchInputValue === '')
      this.changeInputValue.emit(this.searchInputValue);
  }

  emitInputChange() {
    this.changeInputValue.emit(this.searchInputValue);
  }
  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.Navigate(event.url);
      }
    });
    this.Navigate(this.router.url);
  }
  Navigate(url:string){
    if(url === '/system/job-search-add'){
      this.isMainPage = true;
    }
    else{
      this.isMainPage = false;
    }
  }
  toggleBlurOnMouseEnter() {
    this.blurService.setBlurState(true);
  }

  toggleBlurOnMouseLeave() {
    this.blurService.setBlurState(false);
  }
}

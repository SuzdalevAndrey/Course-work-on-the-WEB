import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCreatingPageComponent } from './ad-creating-page.component';

describe('AdCreatingPageComponent', () => {
  let component: AdCreatingPageComponent;
  let fixture: ComponentFixture<AdCreatingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdCreatingPageComponent]
    });
    fixture = TestBed.createComponent(AdCreatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPageComponent } from './add-edit-page.component';

describe('AddEditPageComponent', () => {
  let component: AddEditPageComponent;
  let fixture: ComponentFixture<AddEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPageComponent]
    });
    fixture = TestBed.createComponent(AddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

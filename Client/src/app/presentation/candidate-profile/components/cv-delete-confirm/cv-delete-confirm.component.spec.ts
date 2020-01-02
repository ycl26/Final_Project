import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDeleteConfirmComponent } from './cv-delete-confirm.component';

describe('CvDeleteConfirmComponent', () => {
  let component: CvDeleteConfirmComponent;
  let fixture: ComponentFixture<CvDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

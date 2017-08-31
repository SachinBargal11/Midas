import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledVisitDetailComponent } from './unscheduled-visit-detail.component';

describe('UnscheduledVisitDetailComponent', () => {
  let component: UnscheduledVisitDetailComponent;
  let fixture: ComponentFixture<UnscheduledVisitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledVisitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledVisitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

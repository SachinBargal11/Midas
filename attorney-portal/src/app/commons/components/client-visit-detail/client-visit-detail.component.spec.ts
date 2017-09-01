import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVisitDetailComponent } from './client-visit-detail.component';

describe('ClientVisitDetailComponent', () => {
  let component: ClientVisitDetailComponent;
  let fixture: ComponentFixture<ClientVisitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientVisitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVisitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImeVisitDetailComponent } from './ime-visit-detail.component';

describe('ImeVisitDetailComponent', () => {
  let component: ImeVisitDetailComponent;
  let fixture: ComponentFixture<ImeVisitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImeVisitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImeVisitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DignosisComponent } from './dignosis.component';

describe('DignosisComponent', () => {
  let component: DignosisComponent;
  let fixture: ComponentFixture<DignosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DignosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DignosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

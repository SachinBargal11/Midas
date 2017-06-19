import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateUsersComponent } from './associate-users-component';

describe('AssociateUsersComponent', () => {
    let component: AssociateUsersComponent;
    let fixture: ComponentFixture<AssociateUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AssociateUsersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssociateUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

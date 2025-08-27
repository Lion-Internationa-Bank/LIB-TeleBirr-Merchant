import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizedComponent } from './un-authorized.component';

describe('UnAuthorizedComponent', () => {
  let component: UnAuthorizedComponent;
  let fixture: ComponentFixture<UnAuthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnAuthorizedComponent]
    });
    fixture = TestBed.createComponent(UnAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

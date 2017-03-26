import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtontypeComponent } from './buttontype.component';

describe('ButtontypeComponent', () => {
  let component: ButtontypeComponent;
  let fixture: ComponentFixture<ButtontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

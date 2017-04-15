import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTypeWidgetComponent } from './button-type-widget.component';

describe('ButtonTypeWidgetComponent', () => {
  let component: ButtonTypeWidgetComponent;
  let fixture: ComponentFixture<ButtonTypeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTypeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTypeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

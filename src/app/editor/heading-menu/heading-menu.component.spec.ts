import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingMenuComponent } from './heading-menu.component';

describe('HeadingMenuComponent', () => {
  let component: HeadingMenuComponent;
  let fixture: ComponentFixture<HeadingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

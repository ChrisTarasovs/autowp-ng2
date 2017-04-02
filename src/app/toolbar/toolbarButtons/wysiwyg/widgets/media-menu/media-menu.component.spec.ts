import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMenuComponent } from './media-menu.component';

describe('MediaMenuComponent', () => {
  let component: MediaMenuComponent;
  let fixture: ComponentFixture<MediaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

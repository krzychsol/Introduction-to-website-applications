import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourrateComponent } from './tourrate.component';

describe('TourrateComponent', () => {
  let component: TourrateComponent;
  let fixture: ComponentFixture<TourrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

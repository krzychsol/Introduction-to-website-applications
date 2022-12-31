import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTourComponent } from './modify-tour.component';

describe('ModifyTourComponent', () => {
  let component: ModifyTourComponent;
  let fixture: ComponentFixture<ModifyTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

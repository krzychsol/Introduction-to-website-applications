import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerpanelComponent } from './managerpanel.component';

describe('ManagerpanelComponent', () => {
  let component: ManagerpanelComponent;
  let fixture: ComponentFixture<ManagerpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

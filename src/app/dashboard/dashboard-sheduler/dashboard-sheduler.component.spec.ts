import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShedulerComponent } from './dashboard-sheduler.component';

describe('DashboardShedulerComponent', () => {
  let component: DashboardShedulerComponent;
  let fixture: ComponentFixture<DashboardShedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardShedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

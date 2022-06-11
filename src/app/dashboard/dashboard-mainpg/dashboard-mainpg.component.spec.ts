import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainpgComponent } from './dashboard-mainpg.component';

describe('DashboardMainpgComponent', () => {
  let component: DashboardMainpgComponent;
  let fixture: ComponentFixture<DashboardMainpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMainpgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

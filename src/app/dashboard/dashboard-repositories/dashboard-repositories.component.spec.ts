import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRepositoriesComponent } from './dashboard-repositories.component';

describe('DashboardRepositoriesComponent', () => {
  let component: DashboardRepositoriesComponent;
  let fixture: ComponentFixture<DashboardRepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRepositoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

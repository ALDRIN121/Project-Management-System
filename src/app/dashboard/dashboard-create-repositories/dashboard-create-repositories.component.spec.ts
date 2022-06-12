import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCreateRepositoriesComponent } from './dashboard-create-repositories.component';

describe('DashboardCreateRepositoriesComponent', () => {
  let component: DashboardCreateRepositoriesComponent;
  let fixture: ComponentFixture<DashboardCreateRepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCreateRepositoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCreateRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

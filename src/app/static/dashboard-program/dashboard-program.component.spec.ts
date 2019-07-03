import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProgramComponent } from './dashboard-program.component';

describe('DashboardProgramComponent', () => {
  let component: DashboardProgramComponent;
  let fixture: ComponentFixture<DashboardProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

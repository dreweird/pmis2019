import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bed1Component } from './bed1.component';

describe('Bed1Component', () => {
  let component: Bed1Component;
  let fixture: ComponentFixture<Bed1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Bed1Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bed1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

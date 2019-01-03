import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bed2Component } from './bed2.component';

describe('Bed2Component', () => {
  let component: Bed2Component;
  let fixture: ComponentFixture<Bed2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Bed2Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bed2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

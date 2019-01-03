import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bed3Component } from './bed3.component';

describe('Bed3Component', () => {
  let component: Bed3Component;
  let fixture: ComponentFixture<Bed3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Bed3Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bed3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

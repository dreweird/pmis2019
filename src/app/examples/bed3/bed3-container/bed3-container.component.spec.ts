import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bed3ContainerComponent } from './bed3-container.component';

describe('Bed3ContainerComponent', () => {
  let component: Bed3ContainerComponent;
  let fixture: ComponentFixture<Bed3ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bed3ContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bed3ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

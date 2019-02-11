import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bed1ContainerComponent } from './bed1-container.component';

describe('Bed1ContainerComponent', () => {
  let component: Bed1ContainerComponent;
  let fixture: ComponentFixture<Bed1ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bed1ContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bed1ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'anms-bed1-container',
  templateUrl: './bed1-container.component.html',
  styleUrls: ['./bed1-container.component.css']
})
export class Bed1ContainerComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  myDate: Date;

  constructor() {
    this.myDate = new Date();
   }

  ngOnInit() {
    let da_fin = new CanvasJS.Chart("da_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 10
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 500000,
            userCallback: function(value: any){
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join('.');
              return 'Php' + value;
            }
          }
        }]
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 1356481813, label: "Jan" },
          { y: 1209192410, label: "Feb" },
          { y: 715029518, label: "Mar" },
          { y: 872038058, label: "Apr" },
          { y: 1101060985, label: "May" },
          { y: 1356481813, label: "Jun" },
          { y: 1209192410, label: "Jul" },
          { y: 715029518, label: "Aug" },
          { y: 872038058, label: "Sep" },
          { y: 1101060985, label: "Oct" },
          { y: 715029518, label: "Nov" },
          { y: 872038058, label: "Dec" }
        ]
      },
      {
        type: "line",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 1054009776.56, label: "Jan" },
          { y: 1094628156.23, label: "Feb" },
          { y: 614218110.32, label: "Mar" },
          { y: 780817121.93, label: "Apr" },
          { y: 742013840.75, label: "May" },
          { y: 1054009776.56, label: "Jun" },
          { y: 1094628156.23, label: "Jul" },
          { y: 614218110.32, label: "Aug" },
          { y: 780817121.93, label: "Sep" },
          { y: 742013840.75, label: "Oct" },
          { y: 780817121.93, label: "Nov" },
          { y: 742013840.75, label: "Dec" }
        ]
      },
      {
        type: "line",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 524255213.06, label: "Jan" },
          { y: 445906925.25, label: "Feb" },
          { y: 363348074.76, label: "Mar" },
          { y: 577955007.65, label: "Apr" },
          { y: 566486901.6, label: "May" },
          { y: 524255213.06, label: "Jun" },
          { y: 445906925.25, label: "Jul" },
          { y: 363348074.76, label: "Aug" },
          { y: 577955007.65, label: "Sep" },
          { y: 566486901.6, label: "Oct" },
          { y: 577955007.65, label: "Nov" },
          { y: 566486901.6, label: "Dec" }
        ]
      }]
    });
      
    da_fin.render();
  }

}

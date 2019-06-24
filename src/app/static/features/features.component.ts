import { Component, OnInit, ViewChild } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';


import { features, da_financial } from './features.data';
import * as CanvasJS from '../../../assets/canvasjs.min';
import {MatAccordion} from '@angular/material';

@Component({
  selector: 'anms-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features = features;
  panelOpenState = false;

  @ViewChild('myaccordion') myPanels: MatAccordion;

  ngOnInit() {
    CanvasJS.addColorSet("customColorSet1",
      [//colorSet Array
      "#4661EE",
      "#EC5657",
      "#1BCDD1",
      "#8FAABB",
      "#B08BEB",
      "#3EA0DD",
      "#F5A52A",
      "#23BFAA",
      "#FAA586",
      "#EB8CC6",
     ]); 

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
          { y: 1356481813, label: "2014" },
          { y: 1209192410, label: "2015" },
          { y: 715029518, label: "2016" },
          { y: 872038058, label: "2017" },
          { y: 1101060985, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 1054009776.56, label: "2014" },
          { y: 1094628156.23, label: "2015" },
          { y: 614218110.32, label: "2016" },
          { y: 780817121.93, label: "2017" },
          { y: 742013840.75, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 524255213.06, label: "2014" },
          { y: 445906925.25, label: "2015" },
          { y: 363348074.76, label: "2016" },
          { y: 577955007.65, label: "2017" },
          { y: 566486901.6, label: "2018" }
        ]
      }]
    });
      
    da_fin.render();
  
    let da_fin_per = new CanvasJS.Chart("da_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment"
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 77.70 , label: "2014" },
          { y: 90.53, label: "2015" },
          { y: 85.90, label: "2016" },
          { y: 89.54, label: "2017" },
          { y: 67.39, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 38.65 , label: "2014" },
          { y: 36.88, label: "2015" },
          { y: 50.82, label: "2016" },
          { y: 66.28, label: "2017" },
          { y: 51.45, label: "2018" }
        ]
      }
    ]
    });
      
    da_fin_per.render();

    let da_phys = new CanvasJS.Chart("da_phys", {
      animationEnabled: true,
      title:{
        text: "Physical Performance with Relative Weight"
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY"
      },
      axisY: {
        suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "stackedColumn",
        name: "RICE",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 31.96 },
          { x: new Date(2015,0), y: 33.21 },
          { x: new Date(2016,0), y: 27.85 },
          { x: new Date(2017,0), y: 19.12 },
          { x: new Date(2018,0), y: 34.95 }
        ]
      }, 
      {
        type: "stackedColumn",
        name: "CORN",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 4.33 },
          { x: new Date(2015,0), y: 9.87 },
          { x: new Date(2016,0), y: 7.82 },
          { x: new Date(2017,0), y: 4.13 },
          { x: new Date(2018,0), y: 5.97 }
        ]
      }, 
      {
        type: "stackedColumn",
        name: "HVCDP",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 12.57 },
          { x: new Date(2015,0), y: 17.01 },
          { x: new Date(2016,0), y: 10.62 },
          { x: new Date(2017,0), y: 9.64 },
          { x: new Date(2018,0), y: 13.94 }
        ]
      },
      {
        type: "stackedColumn",
        name: "LIVESTOCK",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 15.74 },
          { x: new Date(2015,0), y: 18.91 },
          { x: new Date(2016,0), y: 24.61 },
          { x: new Date(2017,0), y: 25.79 },
          { x: new Date(2018,0), y: 11.97 }
        ]
      },
      {
        type: "stackedColumn",
        name: "ORGANIC",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 5.13 },
          { x: new Date(2015,0), y: 2.62 },
          { x: new Date(2016,0), y: 3.22 },
          { x: new Date(2017,0), y: 1.95 },
          { x: new Date(2018,0), y: 2.12 }
        ]
      },
      {
        type: "stackedColumn",
        name: "GSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 2.10 },
          { x: new Date(2015,0), y: 3.31 },
          { x: new Date(2016,0), y: 5.73 },
          { x: new Date(2017,0), y: 3.80 },
          { x: new Date(2018,0), y: 6.03 }
        ]
      },
      {
        type: "stackedColumn",
        name: "REGULAR",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "#total",
        dataPoints: [
          { x: new Date(2014,0), y: 8.22 },
          { x: new Date(2015,0), y: 8.32 },
          { x: new Date(2016,0), y: 10.53 },
          { x: new Date(2017,0), y: 15.47 },
          { x: new Date(2018,0), y: 13.57 }
        ]
      },
    ]
    });

    da_phys.render();

    let chart_gss = new CanvasJS.Chart("gss_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 10
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        color: "#4661EE",
        dataPoints: [
          { y: 11792000, label: "2014" },
          { y: 15834000, label: "2015" },
          { y: 30550295, label: "2016" },
          { y: 32590000, label: "2017" },
          { y: 44373859, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        color: "#EC5657",
        dataPoints: [
          { y: 11792000, label: "2014" },
          { y: 15206750.3, label: "2015" },
          { y: 29894484.06, label: "2016" },
          { y: 30619859.62, label: "2017" },
          { y: 43910563.44, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        color: "#1BCDD1",
        dataPoints: [
          { y: 11706379.37, label: "2014" },
          { y: 13925527.92, label: "2015" },
          { y: 25854393.42, label: "2016" },
          { y: 30189464.12, label: "2017" },
          { y: 17956218.7, label: "2018" }
        ]
      }]
    });

    chart_gss.render();

    let chart_gss_per = new CanvasJS.Chart("gss_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#E429F2",
        dataPoints: [
          { y: 100 , label: "2014" },
          { y: 96.04, label: "2015" },
          { y: 97.85, label: "2016" },
          { y: 93.95, label: "2017" },
          { y: 98.96, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#FF8B00",
        dataPoints: [
          { y: 99.27 , label: "2014" },
          { y: 87.95, label: "2015" },
          { y: 84.63, label: "2016" },
          { y: 92.63, label: "2017" },
          { y: 40.47, label: "2018" }
        ]
      }
    ]
    });

    chart_gss_per.render();

    let chart_gss_phys = new CanvasJS.Chart("gss_phys", {
      animationEnabled: true,
      colorSet: "customColorSet1",
      exportEnabled: true,
      axisY: [{
        maximum: 120
      }],
      title: {
        text: "Physical Performance",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Admin",
        dataPoints: [
          { y: 94 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 100, label: "2016" },
          { y: 100, label: "2017" },
          { y: 100, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "HR",
        dataPoints: [
          { y: 100 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 100, label: "2016" },
          { y: 100, label: "2017" },
          { y: 100, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Budget",
        dataPoints: [
          { y: 100 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 78, label: "2016" },
          { y: 66, label: "2017" },
          { y: 85, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Acctg",
        dataPoints: [
          { y: 96 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 100, label: "2016" },
          { y: 100, label: "2017" },
          { y: 100, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "GSS",
        dataPoints: [
          { y: 88 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 100, label: "2016" },
          { y: 83, label: "2017" },
          { y: 87, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Records",
        dataPoints: [
          { y: 100 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 93, label: "2016" },
          { y: 100, label: "2017" },
          { y: 100, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Cashier",
        dataPoints: [
          { y: 100 , label: "2014" },
          { y: 100, label: "2015" },
          { y: 93, label: "2016" },
          { y: 100, label: "2017" },
          { y: 100, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Info",
        dataPoints: [
          { y: null , label: "2014" },
          { y: 84, label: "2015" },
          { y: 100, label: "2016" },
          { y: 60, label: "2017" },
          { y: 100, label: "2018" }
        ]
      }
    ]
    });

    chart_gss_phys.render();


    let rice_fin = new CanvasJS.Chart("rice_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 5
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 254110000, label: "2014" },
          { y: 169045000, label: "2015" },
          { y: 154759000, label: "2016" },
          { y: 227565000, label: "2017" },
          { y: 267010206, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 169188334.07, label: "2014" },
          { y: 135391681.13, label: "2015" },
          { y: 133763005.63, label: "2016" },
          { y: 194916940.21, label: "2017" },
          { y: 263808822.65, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 98810314.3, label: "2014" },
          { y: 73897243.91, label: "2015" },
          { y: 79617673.25, label: "2016" },
          { y: 141760773.92, label: "2017" },
          { y: 236751285.93, label: "2018" }
        ]
      }]
    });
      
    rice_fin.render();

    let rice_fin_per = new CanvasJS.Chart("rice_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 66.58 , label: "2014" },
          { y: 80.09, label: "2015" },
          { y: 86.43, label: "2016" },
          { y: 85.65, label: "2017" },
          { y: 98.80, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 38.88 , label: "2014" },
          { y: 43.77, label: "2015" },
          { y: 51.45, label: "2016" },
          { y: 62.29, label: "2017" },
          { y: 88.67, label: "2018" }
        ]
      }
    ]
    });

    rice_fin_per.render();

    let rice_phys = new CanvasJS.Chart("rice_phys", {
      animationEnabled: true,
      title:{
        text: "Physical Performance with Relative Weight"
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY"
      },
      axisY: {
        suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "stackedColumn",
        name: "AFMEFSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 45.51 },
          { x: new Date(2015,0), y: 10.32 },
          { x: new Date(2016,0), y: 10.09 },
          { x: new Date(2017,0), y: 6.39 },
          { x: new Date(2018,0), y: 21.06 }
        ]
      }, 
      {
        type: "stackedColumn",
        name: "INS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0 },
          { x: new Date(2015,0), y: 13.31 },
          { x: new Date(2016,0), y: 11.38 },
          { x: new Date(2017,0), y: 26.57 },
          { x: new Date(2018,0), y: 17.95 }
        ]
      }, 
      {
        type: "stackedColumn",
        name: "R&D",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0 },
          { x: new Date(2015,0), y: 7.56 },
          { x: new Date(2016,0), y: 9.25 },
          { x: new Date(2017,0), y: 2.41 },
          { x: new Date(2018,0), y: 2.14 }
        ]
      },
      {
        type: "stackedColumn",
        name: "ESETS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 19.81 },
          { x: new Date(2015,0), y: 17.89 },
          { x: new Date(2016,0), y: 20.30 },
          { x: new Date(2017,0), y: 12.15 },
          { x: new Date(2018,0), y: 13.59 }
        ]
      },
      {
        type: "stackedColumn",
        name: "MDS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0.35 },
          { x: new Date(2015,0), y: 0.12 },
          { x: new Date(2016,0), y: 0.26 },
          { x: new Date(2017,0), y: null },
          { x: new Date(2018,0), y: null }
        ]
      },
      {
        type: "stackedColumn",
        name: "PSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "#total",
        dataPoints: [
          { x: new Date(2014,0), y: 8.60 },
          { x: new Date(2015,0), y: 45.95 },
          { x: new Date(2016,0), y: 45.36 },
          { x: new Date(2017,0), y: 30.08 },
          { x: new Date(2018,0), y: 41.63 }
        ]
      },
    ]
    });
    rice_phys.render();

    let corn_fin = new CanvasJS.Chart("corn_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 5
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 75225000, label: "2014" },
          { y: 94598000, label: "2015" },
          { y: 91382831, label: "2016" },
          { y: 140032000, label: "2017" },
          { y: 121763456, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 29919172.6, label: "2014" },
          { y: 82869291.42, label: "2015" },
          { y: 81056281.8, label: "2016" },
          { y: 126394777.78, label: "2017" },
          { y: 120407484.2, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 12427064.38, label: "2014" },
          { y: 37951960.89, label: "2015" },
          { y: 42030561.35, label: "2016" },
          { y: 104662172.54, label: "2017" },
          { y: 112938422.72, label: "2018" }
        ]
      }]
    });
      
    corn_fin.render();

    let corn_fin_per = new CanvasJS.Chart("corn_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 39.77 , label: "2014" },
          { y: 87.60, label: "2015" },
          { y: 88.70, label: "2016" },
          { y: 90.26, label: "2017" },
          { y: 98.89, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 16.52 , label: "2014" },
          { y: 40.12, label: "2015" },
          { y: 45.99, label: "2016" },
          { y: 74.74, label: "2017" },
          { y: 92.75, label: "2018" }
        ]
      }
    ]
    });

    corn_fin_per.render();

    let corn_phys = new CanvasJS.Chart("corn_phys", {
      animationEnabled: true,
      title:{
        text: "Physical Performance with Relative Weight"
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY"
      },
      axisY: {
        suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "stackedColumn",
        name: "AFMEFSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 29.02 },
          { x: new Date(2015,0), y: 62.57 },
          { x: new Date(2016,0), y: 63.24 },
          { x: new Date(2017,0), y: 36.55 },
          { x: new Date(2018,0), y: 37.78 }
        ]
      },  
      {
        type: "stackedColumn",
        name: "R&D",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0.23 },
          { x: new Date(2015,0), y: 0.37 },
          { x: new Date(2016,0), y: 0.38 },
          { x: new Date(2017,0), y: 0 },
          { x: new Date(2018,0), y: 0 }
        ]
      },
      {
        type: "stackedColumn",
        name: "ESETS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 5.16 },
          { x: new Date(2015,0), y: 12.02 },
          { x: new Date(2016,0), y: 10.65 },
          { x: new Date(2017,0), y: 0 },
          { x: new Date(2018,0), y: 9.84 }
        ]
      },
      {
        type: "stackedColumn",
        name: "MDS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0.40 },
          { x: new Date(2015,0), y: 1.29 },
          { x: new Date(2016,0), y: 0.49 },
          { x: new Date(2017,0), y: null },
          { x: new Date(2018,0), y: null }
        ]
      },
      {
        type: "stackedColumn",
        name: "PSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "#total",
        dataPoints: [
          { x: new Date(2014,0), y: 13.09 },
          { x: new Date(2015,0), y: 14.92 },
          { x: new Date(2016,0), y: 14.93 },
          { x: new Date(2017,0), y: 37.59 },
          { x: new Date(2018,0), y: 38.55 }
        ]
      },
    ]
    });
    corn_phys.render();

    let hvcdp_fin = new CanvasJS.Chart("hvcdp_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 5
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 97337000, label: "2014" },
          { y: 94223000, label: "2015" },
          { y: 139667149, label: "2016" },
          { y: 223246000, label: "2017" },
          { y: 136573825, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 82754220.75, label: "2014" },
          { y: 75259494.1, label: "2015" },
          { y: 120522305.16, label: "2016" },
          { y: 198143656.86, label: "2017" },
          { y: 134375925.19, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 31747087.56, label: "2014" },
          { y: 18877003.96, label: "2015" },
          { y: 53595104.42, label: "2016" },
          { y: 122349710.48, label: "2017" },
          { y: 103815879.59, label: "2018" }
        ]
      }]
    });
      
    hvcdp_fin.render();

    let hvcdp_fin_per = new CanvasJS.Chart("hvcdp_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 85.02 , label: "2014" },
          { y: 79.87, label: "2015" },
          { y: 86.23, label: "2016" },
          { y: 88.76, label: "2017" },
          { y: 98.39, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 32.06 , label: "2014" },
          { y: 20.03, label: "2015" },
          { y: 38.37, label: "2016" },
          { y: 54.80, label: "2017" },
          { y: 76.01, label: "2018" }
        ]
      }
    ]
    });

    hvcdp_fin_per.render();

    let hvcdp_phys = new CanvasJS.Chart("hvcdp_phys", {
      animationEnabled: true,
      title:{
        text: "Physical Performance with Relative Weight"
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY"
      },
      axisY: {
        suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "stackedColumn",
        name: "AFMEFSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 27.59 },
          { x: new Date(2015,0), y: 23.96 },
          { x: new Date(2016,0), y: 3.69 },
          { x: new Date(2017,0), y: 8.33 },
          { x: new Date(2018,0), y: 22.37 }
        ]
      },  
      {
        type: "stackedColumn",
        name: "INS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 14.71 },
          { x: new Date(2015,0), y: 1.39 },
          { x: new Date(2016,0), y: 0 },
          { x: new Date(2017,0), y: 2.70 },
          { x: new Date(2018,0), y: 1.46 }
        ]
      },
      {
        type: "stackedColumn",
        name: "ESETS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 8.38 },
          { x: new Date(2015,0), y: 9.64 },
          { x: new Date(2016,0), y: 8.84 },
          { x: new Date(2017,0), y: 0.13 },
          { x: new Date(2018,0), y: 8.30 }
        ]
      },
      {
        type: "stackedColumn",
        name: "MDS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0.31 },
          { x: new Date(2015,0), y: 2.55 },
          { x: new Date(2016,0), y: 0.41 },
          { x: new Date(2017,0), y: null },
          { x: new Date(2018,0), y: null }
        ]
      },
      {
        type: "stackedColumn",
        name: "PSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "#total",
        dataPoints: [
          { x: new Date(2014,0), y: 35.54 },
          { x: new Date(2015,0), y: 34.39 },
          { x: new Date(2016,0), y: 62.17 },
          { x: new Date(2017,0), y: 41.95 },
          { x: new Date(2018,0), y: 52.17 }
        ]
      },
    ]
    });
    hvcdp_phys.render();

    let livestock_fin = new CanvasJS.Chart("livestock_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 5
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 42271000, label: "2014" },
          { y: 48206000, label: "2015" },
          { y: 42975570, label: "2016" },
          { y: 84302000, label: "2017" },
          { y: 50990979, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 31838888.79, label: "2014" },
          { y: 41991014.86, label: "2015" },
          { y: 37030592.33, label: "2016" },
          { y: 79470449.44, label: "2017" },
          { y: 50692518.66, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 22610871.85, label: "2014" },
          { y: 27797695.49, label: "2015" },
          { y: 21893365.1, label: "2016" },
          { y: 57654361.49, label: "2017" },
          { y: 44212984.98, label: "2018" }
        ]
      }]
    });
      
    livestock_fin.render();

    let livestock_fin_per = new CanvasJS.Chart("livestock_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 75.32 , label: "2014" },
          { y: 87.11, label: "2015" },
          { y: 86.17, label: "2016" },
          { y: 94.27, label: "2017" },
          { y: 99.41, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 53.49 , label: "2014" },
          { y: 57.66, label: "2015" },
          { y: 50.94, label: "2016" },
          { y: 68.39, label: "2017" },
          { y: 86.71, label: "2018" }
        ]
      }
    ]
    });

    livestock_fin_per.render();

    let livestock_phys = new CanvasJS.Chart("livestock_phys", {
      animationEnabled: true,
      title:{
        text: "Physical Performance with Relative Weight"
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY"
      },
      axisY: {
        suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "stackedColumn",
        name: "AFMEFSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 2.72 },
          { x: new Date(2015,0), y: 10.88 },
          { x: new Date(2016,0), y: 21.23 },
          { x: new Date(2017,0), y: 53.48 },
          { x: new Date(2018,0), y: 17.89 }
        ]
      },  
      {
        type: "stackedColumn",
        name: "R&D",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: null },
          { x: new Date(2015,0), y: 0.41 },
          { x: new Date(2016,0), y: 0 },
          { x: new Date(2017,0), y: 0.44 },
          { x: new Date(2018,0), y: null }
        ]
      },
      {
        type: "stackedColumn",
        name: "ESETS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 17.53 },
          { x: new Date(2015,0), y: 17.60 },
          { x: new Date(2016,0), y: 17.58 },
          { x: new Date(2017,0), y: 9.92 },
          { x: new Date(2018,0), y: 11.34 }
        ]
      },
      {
        type: "stackedColumn",
        name: "MDS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 0.47 },
          { x: new Date(2015,0), y: 0.41 },
          { x: new Date(2016,0), y: 0.23 },
          { x: new Date(2017,0), y: 0.36 },
          { x: new Date(2018,0), y: null }
        ]
      },
      {
        type: "stackedColumn",
        name: "PSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "#total",
        dataPoints: [
          { x: new Date(2014,0), y: 78.88 },
          { x: new Date(2015,0), y: 60.40 },
          { x: new Date(2016,0), y: 55.24 },
          { x: new Date(2017,0), y: 33.62 },
          { x: new Date(2018,0), y: 35.30 }
        ]
      },
    ]
    });
    livestock_phys.render();

    let oa_fin = new CanvasJS.Chart("oa_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 5
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 30083000, label: "2014" },
          { y: 16690000, label: "2015" },
          { y: 17891000, label: "2016" },
          { y: 16746000, label: "2017" },
          { y: 15640000, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 27000512.08, label: "2014" },
          { y: 14045389.11, label: "2015" },
          { y: 16267369.9, label: "2016" },
          { y: 15481132.05, label: "2017" },
          { y: 15632404, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 14607210.46, label: "2014" },
          { y: 7987452.49, label: "2015" },
          { y: 6471225, label: "2016" },
          { y: 13097508.97, label: "2017" },
          { y: 15611027, label: "2018" }
        ]
      }]
    });
      
    oa_fin.render();

    let oa_fin_per = new CanvasJS.Chart("oa_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 89.75 , label: "2014" },
          { y: 84.15, label: "2015" },
          { y: 90.92, label: "2016" },
          { y: 92.45, label: "2017" },
          { y: 99.95, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 48.56 , label: "2014" },
          { y: 47.86, label: "2015" },
          { y: 36.17, label: "2016" },
          { y: 78.21, label: "2017" },
          { y: 99.81, label: "2018" }
        ]
      }
    ]
    });

    oa_fin_per.render();

    let oa_phys = new CanvasJS.Chart("oa_phys", {
      animationEnabled: true,
      title:{
        text: "Physical Performance with Relative Weight"
      },
      axisX: {
        interval: 1,
        intervalType: "year",
        valueFormatString: "YYYY"
      },
      axisY: {
        suffix: "%"
      },
      toolTip: {
        shared: true
      },
      legend: {
        reversed: true,
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [{
        type: "stackedColumn",
        name: "AFMEFSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 10.54 },
          { x: new Date(2015,0), y: 0 },
          { x: new Date(2016,0), y: 49.98 },
          { x: new Date(2017,0), y: 20.69 },
          { x: new Date(2018,0), y: 26.73 }
        ]
      },  
      {
        type: "stackedColumn",
        name: "ESETS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: 32.19 },
          { x: new Date(2015,0), y: 63.00 },
          { x: new Date(2016,0), y: 14.51 },
          { x: new Date(2017,0), y: 42.08 },
          { x: new Date(2018,0), y: 38.88 }
        ]
      },
      {
        type: "stackedColumn",
        name: "MDS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        dataPoints: [
          { x: new Date(2014,0), y: null },
          { x: new Date(2015,0), y: 2.40 },
          { x: new Date(2016,0), y: 2.24 },
          { x: new Date(2017,0), y: null },
          { x: new Date(2018,0), y: null }
        ]
      },
      {
        type: "stackedColumn",
        name: "PSS",
        showInLegend: true,
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0\"%\"",
        indexLabel: "#total",
        dataPoints: [
          { x: new Date(2014,0), y: 55.41 },
          { x: new Date(2015,0), y: 16.63 },
          { x: new Date(2016,0), y: 24.45 },
          { x: new Date(2017,0), y: 37.23 },
          { x: new Date(2018,0), y: 34.39 }
        ]
      },
    ]
    });
    oa_phys.render();

    let regular_fin = new CanvasJS.Chart("regular_fin", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Financial Performance",
        fontSize: 15
      },
      axisY: {
        title: "Value in Peso",
        fontSize: 5
      },
      legend: {
        cursor:"pointer",
      },
      data: [{
        type: "column",
        showInLegend: true,
        name: "Allotment",
        dataPoints: [
          { y: 45742000, label: "2014" },
          { y: 39815000, label: "2015" },
          { y: 56147050, label: "2016" },
          { y: 132615000, label: "2017" },
          { y: 99893477, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: 30619933.62, label: "2014" },
          { y: 30304356.94, label: "2015" },
          { y: 52194557.49, label: "2016" },
          { y: 122181898.7, label: "2017" },
          { y: 98425636.53, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Disbursement",
        dataPoints: [
          { y: 27891020.91, label: "2014" },
          { y: 26428809.73, label: "2015" },
          { y: 47408726.84, label: "2016" },
          { y: 13097508.97, label: "2017" },
          { y: 95083283.47, label: "2018" }
        ]
      }]
    });
      
    regular_fin.render();

    let regular_fin_per = new CanvasJS.Chart("regular_fin_per", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Obligation & Disbursement Percentage Against Current Allotment",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Obligation",
        color: "#4661EE",
        dataPoints: [
          { y: 66.94 , label: "2014" },
          { y: 76.11, label: "2015" },
          { y: 92.96, label: "2016" },
          { y: 92.13, label: "2017" },
          { y: 98.53, label: "2018" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "Disbursement",
        color: "#EC5657",
        dataPoints: [
          { y: 60.97 , label: "2014" },
          { y: 66.38, label: "2015" },
          { y: 84.44, label: "2016" },
          { y: 71.70, label: "2017" },
          { y: 26.37, label: "2018" }
        ]
      }
    ]
    });

    regular_fin_per.render();

    let regular_phys = new CanvasJS.Chart("regular_phys", {
      animationEnabled: true,
      colorSet: "customColorSet1",
      exportEnabled: true,
      axisY: [{
        maximum: 120
      }],
      title: {
        text: "Physical Performance",
        fontSize: 15
      },
      data: [{
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "2014",
        dataPoints: [
          { y: null , label: "STO-PMED" },
          { y: 100, label: "PSS" },
          { y: null, label: "MDS" },
          { y: 100, label: "R&D" },
          { y: 100, label: "Regulatory" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "2015",
        dataPoints: [
          { y: 100 , label: "STO-PMED" },
          { y: 100, label: "PSS" },
          { y: 100, label: "MDS" },
          { y: 100, label: "R&D" },
          { y: 100, label: "Regulatory" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "2016",
        dataPoints: [
          { y: 100 , label: "STO-PMED" },
          { y: 100, label: "PSS" },
          { y: 100, label: "MDS" },
          { y: 100, label: "R&D" },
          { y: 100, label: "Regulatory" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "2017",
        dataPoints: [
          { y: 100 , label: "STO-PMED" },
          { y: 100, label: "PSS" },
          { y: 100, label: "MDS" },
          { y: 75, label: "R&D" },
          { y: 100, label: "Regulatory" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        percentFormatString: "#0.##",
        toolTipContent: "{y} %",
        name: "2018",
        dataPoints: [
          { y: 100 , label: "STO-PMED" },
          { y: 100, label: "PSS" },
          { y: 100, label: "MDS" },
          { y: 92, label: "R&D" },
          { y: 100, label: "Regulatory" }
        ]
      }
    ]
    });

    regular_phys.render();

  }


}

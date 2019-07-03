import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { MfoService } from '@app/examples/services/mfo.service';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
@Component({
  selector: 'anms-dashboard-program',
  templateUrl: './dashboard-program.component.html',
  styleUrls: ['./dashboard-program.component.css'],
  providers: [MfoService]
})
export class DashboardProgramComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  myDate: Date;
  program: any;
  pid: any;
  prog_fin: any; prog_phys: any; prog_dis: any;
  show: boolean = true;
  show2: boolean = true;
  show3: boolean = true;
  show4: boolean = true;

  da_fin: any;
  da_phys: any;
  data: any;

  constructor(private route: ActivatedRoute, private mfoService: MfoService) {
    this.myDate = new Date();
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.program = params["prog"];
      this.pid = params["pid"];
      this.mfoService.getPerformance_program(this.pid).subscribe(data =>{
        console.log(data);
        this.data = data;
        this.prog_fin = ((data[0].fa/data[0].ft) * 100).toFixed(2) + '%';
        this.prog_phys = ((data[0].pa/data[0].pt) * 100).toFixed(2) + '%';
        this.prog_dis = ((data[0].da/data[0].dt) * 100).toFixed(2) + '%';

        this.da_fin = new CanvasJS.Chart("da_fin", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Financial Performance - Non-Commulative",
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
            name: "Financial Target",
            dataPoints: [
              { y: data[0].janft, label: "Jan" },
              { y: data[0].febft, label: "Feb" },
              { y: data[0].marft, label: "Mar" },
              { y: data[0].aprft, label: "Apr" },
              { y: data[0].mayft, label: "May" },
              { y: data[0].junft, label: "Jun" },
              { y: data[0].julft, label: "Jul" },
              { y: data[0].augft, label: "Aug" },
              { y: data[0].sepft, label: "Sep" },
              { y: data[0].octft, label: "Oct" },
              { y: data[0].novft, label: "Nov" },
              { y: data[0].decft, label: "Dec" }
            ]
          },
          {
            type: "column",
            showInLegend: true,
            name: "Obligation",
            dataPoints: [
              { y: data[0].janfa, label: "Jan" },
              { y: data[0].febfa, label: "Feb" },
              { y: data[0].marfa, label: "Mar" },
              { y: data[0].aprfa, label: "Apr" },
              { y: data[0].mayfa, label: "May" },
              { y: data[0].junfa, label: "Jun" },
              { y: data[0].julfa, label: "Jul" },
              { y: data[0].augfa, label: "Aug" },
              { y: data[0].sepfa, label: "Sep" },
              { y: data[0].octfa, label: "Oct" },
              { y: data[0].novfa, label: "Nov" },
              { y: data[0].decfa, label: "Dec" }
            ]
          },
          {
            type: "line",
            showInLegend: true,
            name: "Disbursement Target",
            dataPoints: [
              { y: data[0].jandt, label: "Jan" },
              { y: data[0].febdt, label: "Feb" },
              { y: data[0].mardt, label: "Mar" },
              { y: data[0].aprdt, label: "Apr" },
              { y: data[0].maydt, label: "May" },
              { y: data[0].jundt, label: "Jun" },
              { y: data[0].juldt, label: "Jul" },
              { y: data[0].augdt, label: "Aug" },
              { y: data[0].sepdt, label: "Sep" },
              { y: data[0].octdt, label: "Oct" },
              { y: data[0].novdt, label: "Nov" },
              { y: data[0].decdt, label: "Dec" }
            ]
          },
    
          {
            type: "line",
            showInLegend: true,
            name: "Actual Disbursement",
            dataPoints: [
              { y: data[0].janda, label: "Jan" },
              { y: data[0].febda, label: "Feb" },
              { y: data[0].marda, label: "Mar" },
              { y: data[0].aprda, label: "Apr" },
              { y: data[0].mayda, label: "May" },
              { y: data[0].junda, label: "Jun" },
              { y: data[0].julda, label: "Jul" },
              { y: data[0].augda, label: "Aug" },
              { y: data[0].sepda, label: "Sep" },
              { y: data[0].octda, label: "Oct" },
              { y: data[0].novda, label: "Nov" },
              { y: data[0].decda, label: "Dec" }
            ]
          }]
        });
          
        this.da_fin.render();  

        this.da_phys = new CanvasJS.Chart("da_phys", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Physical Performance - Non-Commulative",
          },
          axisY: {
            title: "Number of Target",
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
            name: "Physical Target",
            dataPoints: [
              { y: data[0].jant, label: "Jan" },
              { y: data[0].febt, label: "Feb" },
              { y: data[0].mart, label: "Mar" },
              { y: data[0].aprt, label: "Apr" },
              { y: data[0].mayt, label: "May" },
              { y: data[0].junt, label: "Jun" },
              { y: data[0].jult, label: "Jul" },
              { y: data[0].augt, label: "Aug" },
              { y: data[0].sept, label: "Sep" },
              { y: data[0].octt, label: "Oct" },
              { y: data[0].novt, label: "Nov" },
              { y: data[0].dect, label: "Dec" }
            ]
          },
          {
            type: "column",
            showInLegend: true,
            name: "Accomplishment",
            dataPoints: [
              { y: data[0].jana, label: "Jan" },
              { y: data[0].feba, label: "Feb" },
              { y: data[0].mara, label: "Mar" },
              { y: data[0].apra, label: "Apr" },
              { y: data[0].maya, label: "May" },
              { y: data[0].juna, label: "Jun" },
              { y: data[0].jula, label: "Jul" },
              { y: data[0].auga, label: "Aug" },
              { y: data[0].sepa, label: "Sep" },
              { y: data[0].octa, label: "Oct" },
              { y: data[0].nova, label: "Nov" },
              { y: data[0].deca, label: "Dec" }
            ]
          }]
        });
          
        this.da_phys.render();  
      })
  });
  }

  render(){
    this.da_fin.options.axisY = {
      title: "Value in Peso",
      fontSize: 10
    };
    if(!this.show){
      this.da_fin.options.title = {
        text: "Financial Performance - Commulative",
      };
      this.da_fin.options.data = [{
        type: "column",
        showInLegend: true,
        name: "Financial Target",
        dataPoints: [
          { y: this.data[0].janft, label: "Jan" },
          { y: this.data[0].febft + this.data[0].janft, label: "Feb" },
          { y: this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Mar" },
          { y: this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Apr" },
          { y: this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "May" },
          { y: this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Jun" },
          { y: this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Jul" },
          { y: this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Aug" },
          { y: this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Sep" },
          { y: this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Oct" },
          { y: this.data[0].novft + this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Nov" },
          { y: this.data[0].decft + this.data[0].novft + this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft, label: "Dec" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: this.data[0].janfa, label: "Jan" },
          { y: this.data[0].febfa + this.data[0].janfa, label: "Feb" },
          { y: this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Mar" },
          { y: this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Apr" },
          { y: this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "May" },
          { y: this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Jun" },
          { y: this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Jul" },
          { y: this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Aug" },
          { y: this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Sep" },
          { y: this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Oct" },
          { y: this.data[0].novfa + this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Nov" },
          { y: this.data[0].decfa + this.data[0].novfa + this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa, label: "Dec" }
        ]
      },
      {
        type: "line",
        showInLegend: true,
        name: "Disbursement Target",
        dataPoints: [
          { y: this.data[0].jandt, label: "Jan" },
          { y: this.data[0].febdt + this.data[0].jandt, label: "Feb" },
          { y: this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Mar" },
          { y: this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Apr" },
          { y: this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "May" },
          { y: this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Jun" },
          { y: this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Jul" },
          { y: this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Aug" },
          { y: this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Sep" },
          { y: this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Oct" },
          { y: this.data[0].novdt + this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Nov" },
          { y: this.data[0].decdt + this.data[0].novdt + this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt, label: "Dec" }
        ]
      },

      {
        type: "line",
        showInLegend: true,
        name: "Actual Disbursement",
        dataPoints: [
          { y: this.data[0].janda, label: "Jan" },
          { y: this.data[0].febda + this.data[0].janda, label: "Feb" },
          { y: this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Mar" },
          { y: this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Apr" },
          { y: this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "May" },
          { y: this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Jun" },
          { y: this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Jul" },
          { y: this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Aug" },
          { y: this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Sep" },
          { y: this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Oct" },
          { y: this.data[0].novda + this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Nov" },
          { y: this.data[0].decda + this.data[0].novda + this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda, label: "Dec" }
        ]
      }];
  
    this.da_fin.render();
    }else{
      this.da_fin.options.title = {
        text: "Financial Performance - Non-Commulative",
      };
      this.da_fin.options.data = [{
        type: "column",
        showInLegend: true,
        name: "Financial Target",
        dataPoints: [
          { y: this.data[0].janft, label: "Jan" },
          { y: this.data[0].febft, label: "Feb" },
          { y: this.data[0].marft, label: "Mar" },
          { y: this.data[0].aprft, label: "Apr" },
          { y: this.data[0].mayft, label: "May" },
          { y: this.data[0].junft, label: "Jun" },
          { y: this.data[0].julft, label: "Jul" },
          { y: this.data[0].augft, label: "Aug" },
          { y: this.data[0].sepft, label: "Sep" },
          { y: this.data[0].octft, label: "Oct" },
          { y: this.data[0].novft, label: "Nov" },
          { y: this.data[0].decft, label: "Dec" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Obligation",
        dataPoints: [
          { y: this.data[0].janfa, label: "Jan" },
          { y: this.data[0].febfa, label: "Feb" },
          { y: this.data[0].marfa, label: "Mar" },
          { y: this.data[0].aprfa, label: "Apr" },
          { y: this.data[0].mayfa, label: "May" },
          { y: this.data[0].junfa, label: "Jun" },
          { y: this.data[0].julfa, label: "Jul" },
          { y: this.data[0].augfa, label: "Aug" },
          { y: this.data[0].sepfa, label: "Sep" },
          { y: this.data[0].octfa, label: "Oct" },
          { y: this.data[0].novfa, label: "Nov" },
          { y: this.data[0].decfa, label: "Dec" }
        ]
      },
      {
        type: "line",
        showInLegend: true,
        name: "Disbursement Target",
        dataPoints: [
          { y: this.data[0].jandt, label: "Jan" },
          { y: this.data[0].febdt, label: "Feb" },
          { y: this.data[0].mardt, label: "Mar" },
          { y: this.data[0].aprdt, label: "Apr" },
          { y: this.data[0].maydt, label: "May" },
          { y: this.data[0].jundt, label: "Jun" },
          { y: this.data[0].juldt, label: "Jul" },
          { y: this.data[0].augdt, label: "Aug" },
          { y: this.data[0].sepdt, label: "Sep" },
          { y: this.data[0].octdt, label: "Oct" },
          { y: this.data[0].novdt, label: "Nov" },
          { y: this.data[0].decdt, label: "Dec" }
        ]
      },

      {
        type: "line",
        showInLegend: true,
        name: "Actual Disbursement",
        dataPoints: [
          { y: this.data[0].janda, label: "Jan" },
          { y: this.data[0].febda, label: "Feb" },
          { y: this.data[0].marda, label: "Mar" },
          { y: this.data[0].aprda, label: "Apr" },
          { y: this.data[0].mayda, label: "May" },
          { y: this.data[0].junda, label: "Jun" },
          { y: this.data[0].julda, label: "Jul" },
          { y: this.data[0].augda, label: "Aug" },
          { y: this.data[0].sepda, label: "Sep" },
          { y: this.data[0].octda, label: "Oct" },
          { y: this.data[0].novda, label: "Nov" },
          { y: this.data[0].decda, label: "Dec" }
        ]
      }];

      this.da_fin.render();
    }


  }

  render2(){
    this.da_phys.options.axisY = {
      title: "Number of Targets",
      fontSize: 10
    };
     if(!this.show2){
      this.da_phys.options.title = {
        text: "Physical Performance - Commulative",
      };
       this.da_phys.options.data = [{
        type: "column",
        showInLegend: true,
        name: "Physical Target",
        dataPoints: [
          { y: this.data[0].jant, label: "Jan" },
          { y: this.data[0].febt + this.data[0].jant, label: "Feb" },
          { y: this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Mar" },
          { y: this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Apr" },
          { y: this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "May" },
          { y: this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Jun" },
          { y: this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Jul" },
          { y: this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Aug" },
          { y: this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Sep" },
          { y: this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Oct" },
          { y: this.data[0].novt + this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Nov" },
          { y: this.data[0].dect + this.data[0].novt + this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant, label: "Dec" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Accomplishment",
        dataPoints: [
          { y: this.data[0].jana, label: "Jan" },
          { y: this.data[0].feba + this.data[0].jana, label: "Feb" },
          { y: this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Mar" },
          { y: this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Apr" },
          { y: this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "May" },
          { y: this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Jun" },
          { y: this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Jul" },
          { y: this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Aug" },
          { y: this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Sep" },
          { y: this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Oct" },
          { y: this.data[0].nova + this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Nov" },
          { y: this.data[0].deca + this.data[0].nova + this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana, label: "Dec" }
        ]
      }]
     }else{
      this.da_phys.options.title = {
        text: "Physical Performance - Non-Commulative",
      };
      this.da_phys.options.data = [{
        type: "column",
        showInLegend: true,
        name: "Physical Target",
        dataPoints: [
          { y: this.data[0].jant, label: "Jan" },
          { y: this.data[0].febt, label: "Feb" },
          { y: this.data[0].mart, label: "Mar" },
          { y: this.data[0].aprt, label: "Apr" },
          { y: this.data[0].mayt, label: "May" },
          { y: this.data[0].junt, label: "Jun" },
          { y: this.data[0].jult, label: "Jul" },
          { y: this.data[0].augt, label: "Aug" },
          { y: this.data[0].sept, label: "Sep" },
          { y: this.data[0].octt, label: "Oct" },
          { y: this.data[0].novt, label: "Nov" },
          { y: this.data[0].dect, label: "Dec" }
        ]
      },
      {
        type: "column",
        showInLegend: true,
        name: "Accomplishment",
        dataPoints: [
          { y: this.data[0].jana, label: "Jan" },
          { y: this.data[0].feba, label: "Feb" },
          { y: this.data[0].mara, label: "Mar" },
          { y: this.data[0].apra, label: "Apr" },
          { y: this.data[0].maya, label: "May" },
          { y: this.data[0].juna, label: "Jun" },
          { y: this.data[0].jula, label: "Jul" },
          { y: this.data[0].auga, label: "Aug" },
          { y: this.data[0].sepa, label: "Sep" },
          { y: this.data[0].octa, label: "Oct" },
          { y: this.data[0].nova, label: "Nov" },
          { y: this.data[0].deca, label: "Dec" }
        ]
      }]
     }
     this.da_phys.render();
  }

phys_percentage(){
  if(!this.show4){
    this.da_phys.options.axisY = {
      title: "Percentage",
      fontSize: 10,
      minimum: 0,
      maximum: 120
    };
    this.da_phys.options.title = {
      text: "Physical Performance - Percentage Annual",
    };
    this.da_phys.options.data = [  {
      type: "line",
      showInLegend: true,
      percentFormatString: "#0.##",
      name: "Accomplishment",
      dataPoints: [
        { y: this.data[0].jana / this.data[0].pt * 100, label: "Jan" },
        { y: (this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Feb" },
        { y: (this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Mar" },
        { y: (this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Apr" },
        { y: (this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "May" },
        { y: (this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Jun" },
        { y: (this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Jul" },
        { y: (this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Aug" },
        { y: (this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Sep" },
        { y: (this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Oct" },
        { y: (this.data[0].nova + this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Nov" },
        { y: (this.data[0].deca + this.data[0].nova + this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / this.data[0].pt * 100, label: "Dec" }
      ]
    },{
      type: "line",
      showInLegend: true,
      percentFormatString: "#0.##",
      name: "Physical Target",
      dataPoints: [
        { y: this.data[0].jant / this.data[0].pt * 100, label: "Jan" },
        { y: (this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Feb" },
        { y: (this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Mar" },
        { y: (this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Apr" },
        { y: (this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "May" },
        { y: (this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Jun" },
        { y: (this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Jul" },
        { y: (this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Aug" },
        { y: (this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Sep" },
        { y: (this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Oct" },
        { y: (this.data[0].novt + this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Nov" },
        { y: (this.data[0].dect + this.data[0].novt + this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) / this.data[0].pt * 100, label: "Dec" }
      ]
    }]
  
    this.da_phys.render();
  }else{
    this.da_phys.options.axisY = {
      title: "Percentage",
      fontSize: 10,
      minimum: 0,
      maximum: 200
    };
    this.da_phys.options.title = {
      text: "Physical Performance - Percentage Monthly",
    };
    this.da_phys.options.data = [  {
      type: "column",
      showInLegend: true,
      percentFormatString: "#0.##",
      name: "Accomplishment",
      dataPoints: [
        { y: this.data[0].jana / this.data[0].jant * 100, label: "Jan" },
        { y: (this.data[0].feba + this.data[0].jana) / (this.data[0].febt + this.data[0].jant) * 100, label: "Feb" },
        { y: (this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Mar" },
        { y: (this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Apr" },
        { y: (this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "May" },
        { y: (this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Jun" },
        { y: (this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Jul" },
        { y: (this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Aug" },
        { y: (this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Sep" },
        { y: (this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) /  (this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Oct" },
        { y: (this.data[0].nova + this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].novt + this.data[0].octt + this.data[0].augt + this.data[0].sept + this.data[0].jult + this.data[0].junt  + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Nov" },
        { y: (this.data[0].deca + this.data[0].nova + this.data[0].octa + this.data[0].sepa + this.data[0].auga + this.data[0].jula + this.data[0].juna + this.data[0].maya + this.data[0].apra + this.data[0].mara + this.data[0].feba + this.data[0].jana) / (this.data[0].dect + this.data[0].novt + this.data[0].octt + this.data[0].sept + this.data[0].augt + this.data[0].jult + this.data[0].junt  + this.data[0].mayt + this.data[0].aprt + this.data[0].mart + this.data[0].febt + this.data[0].jant) * 100, label: "Dec" }
      ]
    }]
  
    this.da_phys.render();
  }

}

fin_percentage(){
  if(!this.show3){
    this.da_fin.options.axisY = {
      title: "Percentage",
      fontSize: 10,
      minimum: 0,
      maximum: 120
    };
    this.da_fin.options.title = {
      text: "Financial Performance - Percentage Annual",
    };
    this.da_fin.options.data = [  {
      type: "column",
      showInLegend: true,
      name: "Obligation",
      dataPoints: [
        { y: this.data[0].janfa / this.data[0].ft * 100, label: "Jan" },
        { y: (this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Feb" },
        { y: (this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Mar" },
        { y: (this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Apr" },
        { y: (this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "May" },
        { y: (this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Jun" },
        { y: (this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Jul" },
        { y: (this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Aug" },
        { y: (this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Sep" },
        { y: (this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Oct" },
        { y: (this.data[0].novfa + this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Nov" },
        { y: (this.data[0].decfa + this.data[0].novfa + this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / this.data[0].ft * 100, label: "Dec" }
      ]
    },
    {
      type: "column",
      showInLegend: true,
      name: "Disbursement",
      dataPoints: [
        { y: this.data[0].janda / this.data[0].dt * 100, label: "Jan" },
        { y: (this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Feb" },
        { y: (this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Mar" },
        { y: (this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Apr" },
        { y: (this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "May" },
        { y: (this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Jun" },
        { y: (this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Jul" },
        { y: (this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Aug" },
        { y: (this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Sep" },
        { y: (this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Oct" },
        { y: (this.data[0].novda + this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Nov" },
        { y: (this.data[0].decda + this.data[0].novda + this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / this.data[0].dt * 100, label: "Dec" }
      ]
    },
    
    {
      type: "line",
      showInLegend: true,
      name: "Financial Target",
      dataPoints: [
        { y: this.data[0].janft / this.data[0].ft * 100, label: "Jan" },
        { y: (this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Feb" },
        { y: (this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Mar" },
        { y: (this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Apr" },
        { y: (this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "May" },
        { y: (this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Jun" },
        { y: (this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Jul" },
        { y: (this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Aug" },
        { y: (this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Sep" },
        { y: (this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Oct" },
        { y: (this.data[0].novft + this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Nov" },
        { y: (this.data[0].decft + this.data[0].novft + this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) / this.data[0].ft * 100, label: "Dec" }
      ]
    },
    {
      type: "line",
      showInLegend: true,
      name: "Disbursement Target",
      dataPoints: [
        { y: this.data[0].jandt / this.data[0].dt * 100, label: "Jan" },
        { y: (this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Feb" },
        { y: (this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Mar" },
        { y: (this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Apr" },
        { y: (this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "May" },
        { y: (this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Jun" },
        { y: (this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Jul" },
        { y: (this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Aug" },
        { y: (this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Sep" },
        { y: (this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Oct" },
        { y: (this.data[0].novdt + this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Nov" },
        { y: (this.data[0].decdt + this.data[0].novdt + this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) / this.data[0].dt * 100, label: "Dec" }
      ]
    }]
  
    this.da_fin.render();

  }else{
    this.da_fin.options.axisY = {
      title: "Percentage",
      fontSize: 10,
      minimum: 0,
      maximum: 200
    };
    this.da_fin.options.title = {
      text: "Financial Performance - Percentage Monthly",
    };
    this.da_fin.options.data = [  {
      type: "column",
      showInLegend: true,
      name: "Obligation",
      dataPoints: [
        { y: this.data[0].janfa / this.data[0].janft * 100, label: "Jan" },
        { y: (this.data[0].febfa + this.data[0].janfa) / (this.data[0].febft + this.data[0].janft) * 100, label: "Feb" },
        { y: (this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Mar" },
        { y: (this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Apr" },
        { y: (this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "May" },
        { y: (this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Jun" },
        { y: (this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Jul" },
        { y: (this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Aug" },
        { y: (this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Sep" },
        { y: (this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Oct" },
        { y: (this.data[0].novfa + this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].novft + this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Nov" },
        { y: (this.data[0].decfa + this.data[0].novfa + this.data[0].octfa + this.data[0].sepfa + this.data[0].augfa + this.data[0].julfa + this.data[0].junfa + this.data[0].mayfa + this.data[0].aprfa + this.data[0].marfa + this.data[0].febfa + this.data[0].janfa) / (this.data[0].decft + this.data[0].novft + this.data[0].octft + this.data[0].sepft + this.data[0].augft + this.data[0].julft + this.data[0].junft + this.data[0].mayft + this.data[0].aprft + this.data[0].marft + this.data[0].febft + this.data[0].janft) * 100, label: "Dec" }
      ]
    },
    {
      type: "column",
      showInLegend: true,
      name: "Disbursement",
      dataPoints:  [
        { y: this.data[0].janda / this.data[0].jandt * 100, label: "Jan" },
        { y: (this.data[0].febda + this.data[0].janda) / (this.data[0].febdt + this.data[0].jandt) * 100, label: "Feb" },
        { y: (this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Mar" },
        { y: (this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Apr" },
        { y: (this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "May" },
        { y: (this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Jun" },
        { y: (this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Jul" },
        { y: (this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Aug" },
        { y: (this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Sep" },
        { y: (this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Oct" },
        { y: (this.data[0].novda + this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].novdt + this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Nov" },
        { y: (this.data[0].decda + this.data[0].novda + this.data[0].octda + this.data[0].sepda + this.data[0].augda + this.data[0].julda + this.data[0].junda + this.data[0].mayda + this.data[0].aprda + this.data[0].marda + this.data[0].febda + this.data[0].janda) / (this.data[0].decdt + this.data[0].novdt + this.data[0].octdt + this.data[0].sepdt + this.data[0].augdt + this.data[0].juldt + this.data[0].jundt + this.data[0].maydt + this.data[0].aprdt + this.data[0].mardt + this.data[0].febdt + this.data[0].jandt) * 100, label: "Dec" }
      ]
    }]
  
    this.da_fin.render();

  }
  
}


}

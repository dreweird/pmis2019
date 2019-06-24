import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { districtDetailsDialog } from './districtDetailsDialog.component';
import { logDialog } from '../bed2/logDialog.component';
import { keyframes } from '@angular/animations';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'anms-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit, OnChanges {
  @Input() pid: number = 0;
  @Input() name: string = '';
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  user: any;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  date_updated:any;
  excelStyles:any;
  edit: any;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 

  ngOnChanges(changes:any) {
    console.log(changes.pid.currentValue);
    this.mfoService.getDistrict(changes.pid.currentValue).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
    this.mfoService.getLastUpdated(4, changes.pid.currentValue).subscribe(data => {
    this.date_updated = data;
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getDistrict(this.user.pid).subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  currencyFormatter(params) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }else if(isNaN(params.value)){
      return "";
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  decimalFormatter(params) {
    const number = parseFloat(params.value);
    if (params.value === undefined || params.value === null) {
      return null;
    }else if(isNaN(params.value)){
      return "";
    }
    return number.toLocaleString('en-us', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
  exportcsv(){
    var prvnc = ["adn", "ads", "sdn", "sds", "pdi"];
    var ck=["mfo_name","unitmeasure","taccomp"];
    var district=["one","two"];
    for(var i=0;i<prvnc.length;i++){
      for(var ii=0;ii<=1;ii++){
        if(!(ii==1&&i>3)){
          ck.push("dist."+i+"."+district[ii]+".text");
          ck.push("dist."+i+"."+district[ii]+".target");
          ck.push("dist."+i+"."+district[ii]+".cost");
          ck.push(prvnc[i]+""+(ii+1)+"totalcost");
          ck.push("dist."+i+"."+district[ii]+".text2");
          ck.push("dist."+i+"."+district[ii]+".accomp");
          /*ck.push(prvnc[i]+""+ii+"area");
          ck.push(prvnc[i]+""+ii+"target");
          ck.push(prvnc[i]+""+ii+"cost");
          ck.push(prvnc[i]+""+ii+"aarea");
          ck.push(prvnc[i]+""+ii+"aaccomp");*/
        }
        
      }
    }
    ck.push("q1r","q2r","q3r","q4r")
    console.log(ck);
    var prog_ou=this.user.username;
    if(this.pid!=0) prog_ou=this.name+" - M&E Generated";
    if(prog_ou.substring(0, 7)=="budget_") prog_ou  = prog_ou.substring(7, prog_ou.length+1);
    this.gridApi.exportDataAsExcel({
      customHeader  : [
        [{styleId:'headappend',data:{type:'String', value:'DEPARTMENT OF AGRICULTURE'}}],
        [{styleId:'headappend',data:{type:'String', value:'Regional Field Office XIII'}}],
        [{styleId:'headappend',data:{type:'String', value:'By District Report 2019'}}],
        [{styleId:'headappend',data:{type:'String', value:prog_ou.toUpperCase()}}],
        [{styleId:'headappend',data:{type:'String', value:'C.Y. 2019 CURRENT APPROPRIATION'}}],
        [{styleId:'headappend',data:{type:'String', value: 'PMIS v4.0 Generated as of '+this.months[new Date().getMonth()]+' '+new Date().getDate()+', '+new Date().getFullYear()
        }}],
        [],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}}, 
          {styleId:'p1',data:{type:'String', value:'Agusan del Norte'},mergeAcross:11},
          {styleId:'p2',data:{type:'String', value:'Agusan del Sur'},mergeAcross:11},
          {styleId:'p1',data:{type:'String', value:'Surigao del Norte'},mergeAcross:11},
          {styleId:'p2',data:{type:'String', value:'Surigao del Sur'},mergeAcross:11},
          {styleId:'p1',data:{type:'String', value:'Province of Dinagat Islands'},mergeAcross:5},
          {styleId:'p2',data:{type:'String', value:''},mergeAcross:3},
        ],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'District 1'},mergeAcross:5},
          {styleId:'d2',data:{type:'String', value:'District 2'},mergeAcross:5}, 
          {styleId:'d1',data:{type:'String', value:'Lone District'},mergeAcross:5},
          {styleId:'p1',data:{type:'String', value:'Remarks'},mergeAcross:3},
        ],
        [ {data: {type:'String', value:''}},
          {data: {type:'String', value:''}},
          {data: {type:'String', value:''}}, 
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'t',data:{type:'String', value:'Target'},mergeAcross:3}, {styleId:'a',data:{type:'String', value:'Accomplishment'},mergeAcross:1},
          {styleId:'p1',data:{type:'String', value:''},mergeAcross:3},
        ],
      ],
      columnKeys:ck,
      processHeaderCallback: function(params){
        var name = params.column.colDef.headerName;
        //console.log(params);
        //if(params.column.visible)
        if( name == "mfo_name") {return "PAP";}
        else if(name =="header_program"||name =="header_mfo"||name =="header_indicator"||name =="mfo_id"){} // do nothing
        else {return params.column.colDef.headerName;}
      },
      shouldRowBeSkipped:function(params){
        //console.log(params);
        return params.node.group && params.node.childrenAfterGroup.length==1;
      },
      processCellCallback:function (params){
        var node = params.node;
        console.log(params);
        if(node.group && params.column.colDef.field=="mfo_name") return node.key;
        else if(params.column.colDef.headerName=="Total Cost" && isNaN(params.value))return '';
        else return params.value;
      },
    });
  }

  updateLogs(id: number, value: number, col: string, month: string, beds: number,) {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("4 here");
    this.mfoService
      .updateLogs(id, value, uid.pid, col, month, beds,null,null,null)
      .subscribe(data => console.log(data));
  }

  onCellValueChanged(event){
    if(event.colDef.editable && event.colDef.cellEditor=="agLargeTextCellEditor"){
      console.log(event);
      event.colDef.field[1];
      event.newValue;
      event.data.mfo_id;
      this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.headerName, 41);
      this.mfoService
        .updatePhysical(event.data.mfo_id, event.newValue, event.colDef.field)
        .subscribe(data => {
          //console.log(data);
        });
        this.lastUpdated();
    }
  }

  getLogs(){
    this.dialog.open(logDialog,{data: {
      beds: 4, pid: this.user.pid
    }});
  }

  lastUpdated() {
    this.mfoService.getLastUpdated(4, this.user.pid).subscribe(data => {
      this.date_updated = data;
    });
  }

  onCellClicked(event){
    if(event.data!=undefined && this.user.b==0 && this.user.pid!=100){ // b=0 is for budget account ; pid=100 is m&e account
      console.log(event);
      if(event.colDef.headerName=="PAP"){

      }
      else{
        var province = ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Province of Dinagat Islands", "Butuan City"];
        var prvnc = ["adn", "ads", "sdn", "sds", "pdi", "bxu"];
        var district=["one","two"];
        var municipality = [
            [
              ["Butuan City","Las Nieves","Provincial Agriculture Office","Provincial Veterinary Office"],
              ["Buenavista","City of Cabadbaran","Carmen","Jabonga","Kitcharao","Magallanes","Nasipit","RTR","Santiago","Tubay",]
            ],
            [
              ['City of Bayugan','Esperanza','Prosperidad (Capital)','San Luis','Talacogon','Provincial Agriculture Office','Provincial Veterinary Office','Sibagat'],
              ['Bunawan','La Paz','Loreto','Rosario','San Francisco','Santa Josefa','Trento','Veruela']
            ],
            [
              ['Burgos','Dapa','Del Carmen','General Luna','Pilar','San Benito','San Isidro','Santa Monica (Sapao)','Socorro'],
              ['Alegria','Bacuag','Claver','Gigaquit','Provincial Agriculture Office','Provincial Veterinary Office','Mainit','Malimono','Placer','San Francisco (Anao-aon)','Sison','SURIGAO CITY (Capital)','Tagana-an','Tubod']
            ],
            [
              ['Bayabas','Cagwait','Cantilan','Carmen','Carrascal','Cortes','Lanuza','Lianga','Provincial Agriculture Office','Provincial Veterinary Office','Madrid','Marihatag','San Agustin','San Miguel','Tago','CITY OF TANDAG (Capital)'],
              ['Barobo','City of Bislig','Hinatuan','Lingig','Tagbina']
            ],
            [
              ['Basilisa (Rizal)','Cagdianao','Dinagat','Libjo (Albor)','Loreto','San Jose (Capital)','Tubajon','Provincial Agriculture Office','Provincial Veterinary Office']
            ],
        ];
        for(var i=0;i<6;i++){
          for(var ii=0; ii<district.length;ii++){
            if(event.colDef.field==="dist."+i+"."+district[ii]+".accomp"){
              //console.log("dist."+i+"."+district[ii]+".accomp");
              //console.log("dist."+i+"."+district[ii]+".target");
              if(event.data["dist"][i][district[ii]]["target"]==undefined || event.data["dist"][i][district[ii]]["target"]==0  || event.data["dist"][i][district[ii]]["target"]==null){
                var mes="Error: No target in this location.";
                this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
              }else{
                console.log(event);
                console.log(this.gridApi);
                var data={};
                data['province'] = province[i];
                data['district'] = ii+1;
                data['mfo_id'] = event.data.mfo_id;
                data['mfo_name'] = event.data.mfo_name;
                data['prvnc'] = prvnc[i];
                data['i'] = i;
                data['ii2'] = ii;
                data['ii'] = district[ii];
                data['data'] = event.data;
                data['val'] = event.value;
                data['t_a'] = true;
                data['municipality'] = municipality;
                const dialogRef = this.dialog.open(districtDetailsDialog,{ width: '400px',disableClose: true,data:data});

                dialogRef.afterClosed().subscribe(result=>{
                  console.log(result.data);
                  event.node.setData(result.data);
                  this.gridApi.refreshClientSideRowModel('group');
                  this.lastUpdated();
                });
              }
              break;
            }
            if(event.colDef.field==="dist."+i+"."+district[ii]+".target"){
              console.log("dist."+i+"."+district[ii]+".accomp");
              console.log("dist."+i+"."+district[ii]+".target");
              
                console.log(event);
                console.log(this.gridApi);
                var data={};
                data['province'] = province[i];
                data['district'] = ii+1;
                data['mfo_id'] = event.data.mfo_id;
                data['mfo_name'] = event.data.mfo_name;
                data['prvnc'] = prvnc[i];
                data['i'] = i;
                data['ii2'] = ii;
                data['ii'] = district[ii];
                data['data'] = event.data;
                data['val'] = event.value;
                data['t_a'] = false;
                data['municipality'] = municipality;
                const dialogRef = this.dialog.open(districtDetailsDialog,{ width: '560px',disableClose: true,data:data});

                dialogRef.afterClosed().subscribe(result=>{
                  console.log(result.data);
                  event.node.setData(result.data);
                  this.gridApi.refreshClientSideRowModel('group');
                  this.lastUpdated();
                });
              break;
            }
          }
        }
      }
    }
  }

  constructor(private mfoService: MfoService, public dialog: MatDialog,private snackBar: MatSnackBar) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.edit = this.user.b==0 && this.user.pid!=100;
    this.excelStyles= [
      { id:"indent1",alignment :{indent:1} },
      { id:"indent2",alignment :{indent:2} },
      { id:"indent3",alignment :{indent:3} },
      { id:"indent4",alignment :{indent:4} },
      { id:"indent5",alignment :{indent:5} },
      { id:"bold", font: {bold:true} },
      {
        id: "data",
        font: { size:11, fontName: "Calibri", },
        borders: {
          borderBottom: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
        }
      },
      { id: "p1", interior: { color: "#BBDAFF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "p2", interior: { color: "#86BCFF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "t", interior: { color: "#fddfdf", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "a", interior: { color: "#ffb7b2", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "d1", interior: { color: "#92FEF9", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      { id: "d2", interior: { color: "#01FCEF", pattern: 'Solid' }, font: { size:11, fontName: "Calibri", bold: true }, alignment:{horizontal:'Center'}},
      {
        id: "header",
        font: { size:11, fontName: "Calibri", bold: true, },
        borders: {
          borderBottom: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderLeft: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderRight: { color: "#000000", lineStyle: "Continuous", weight: 1 },
          borderTop: { color: "#000000", lineStyle: "Continuous", weight: 1 },
        }
      },
      { id: "headappend", font: { size:11, fontName: "Calibri", bold: true, }, }
    ];
    this.rowSelection = 'single';
    this.columnDefs = [
      {
        headerName: 'header_main',
        field: 'header_main',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_program',
        field: 'header_program',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_mfo',
        field: 'header_mfo',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_indicator',
        field: 'header_indicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_subindicator',
        field: 'header_subindicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'mfo_id',
        field: 'mfo_id',
        width: 120,                                                                                                                                                                                      
        hide: true
      },
      {
        headerName: 'mfo_name',
        field: 'mfo_name',
        width: 120,                                                                                                                                                                                  
        hide: true,
        cellClass:['data'],
        cellClassRules:{
          indent1: function(params){
            if(params.node.uiLevel==1) return true;
          },
          indent2: function(params){
            if(params.node.uiLevel==2) return true;
          },
          indent3: function(params){
            if(params.node.uiLevel==3) return true;
          },
          indent4: function(params){
            if(params.node.uiLevel==4) return true;
          },
          indent5: function(params){
            if(params.node.uiLevel==5) return true;
          },
          bold: function(params){
            if(params.node.group) return true;
          }
        }
      },
      { headerName: 'Unit Measure', field: 'unitmeasure', width: 100 ,cellClass: ['data']},
      { headerName: 'Accomplished', field: 'taccomp', width: 100, hide:false,cellClass:['data'],
        valueGetter:
        `Number(data.jana) + Number(data.feba) + Number(data.mara) + Number(data.apra) + 
         Number(data.maya) + Number(data.juna) + Number(data.jula) + Number(data.auga) + 
         Number(data.sepa) + Number(data.octa) + Number(data.nova) + Number(data.deca)`,
         type: 'valueColumn',
        cellStyle: { color: 'white', 'background-color': '#b23c9a' },
        
      },
      { headerName: 'Agusan del Norte', 
        children:[
          { headerName: 'District 1',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.0.one.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.one.target', width: 100, type: 'valueColumn', valueFormatter: this.decimalFormatter,
                      cellStyle: { color: 'black', 'background-color': '#6bb9f0' },},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.0.one.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'adn1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[0].one.target) * Number(data.dist[0].one.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area',  field: 'dist.0.one.text2', width: 100, columnGroupShow: 'open',},            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.one.accomp', width: 100,  type: 'valueColumn', valueFormatter: this.decimalFormatter,
                      cellStyle: { color: 'black', 'background-color': '#7befb2' },},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.0.two.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.two.target', width: 100,  type: 'valueColumn',valueFormatter: this.decimalFormatter,},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.0.two.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'adn2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[0].two.target) * Number(data.dist[0].two.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.0.two.text2', width: 100,columnGroupShow: 'open'},          
                  { cellClass:['data'],headerName: 'Number', field: 'dist.0.two.accomp', width: 100,  type: 'valueColumn',valueFormatter: this.decimalFormatter,},
                ]
              }
            ]
          },
        ]
      },
      { headerName: 'Agusan del Sur', 
        children:[
          { headerName: 'District 1',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.1.one.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.1.one.target', width: 100, type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.1.one.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'ads1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[1].one.target) * Number(data.dist[1].one.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area',  field: 'dist.1.one.text2', width: 100, columnGroupShow: 'open',},            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.1.one.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.1.two.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.1.two.target', width: 100,  type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.1.two.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'ads2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[1].two.target) * Number(data.dist[1].two.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.1.two.text2', width: 100,columnGroupShow: 'open'},          
                  { cellClass:['data'],headerName: 'Number', field: 'dist.1.two.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
      { headerName: 'Surigao del Norte', 
        children:[
          { headerName: 'District 1',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.2.one.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.2.one.target', width: 100, type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.2.one.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'sdn1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[2].one.target) * Number(data.dist[2].one.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area',  field: 'dist.2.one.text2', width: 100, columnGroupShow: 'open',},            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.2.one.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.2.two.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.2.two.target', width: 100,  type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.2.two.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'sdn2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[2].two.target) * Number(data.dist[2].two.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.2.two.text2', width: 100,columnGroupShow: 'open'},          
                  { cellClass:['data'],headerName: 'Number', field: 'dist.2.two.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
      { headerName: 'Surigao del Sur', 
        children:[
          { headerName: 'District 1',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.3.one.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.3.one.target', width: 100, type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.3.one.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'sds1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[3].one.target) * Number(data.dist[3].one.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area',  field: 'dist.3.one.text2', width: 100, columnGroupShow: 'open',},            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.3.one.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.3.two.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.3.two.target', width: 100,  type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.3.two.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'sds2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[3].two.target) * Number(data.dist[3].two.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.3.two.text2', width: 100,columnGroupShow: 'open'},          
                  { cellClass:['data'],headerName: 'Number', field: 'dist.3.two.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
      { headerName: 'Province of Dinagat Islands', 
        children:[
          { headerName: 'Lone District',
            children:[   
              { headerName: 'Target', 
                children:[
                  { cellClass:['data'],headerName: 'Area', field: 'dist.4.one.text', width: 100,columnGroupShow: 'open', },            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.4.one.target', width: 100, type: 'valueColumn',},      
                  { cellClass:['data'],headerName: 'Unit Cost', field: 'dist.4.one.cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { cellClass:['data'],headerName: 'Total Cost', field: 'pdi1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.dist[4].one.target) * Number(data.dist[4].one.cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { cellClass:['data'],headerName: 'Area',  field: 'dist.4.one.text2', width: 100, columnGroupShow: 'open',},            
                  { cellClass:['data'],headerName: 'Number', field: 'dist.4.one.accomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
       {
         headerName: 'Remarks', 
         children:[
           { cellClass:['data'],headerName: 'Q1', field: 'q1r', width: 100, editable:this.edit, cellEditor: 'agLargeTextCellEditor'}, 
           { cellClass:['data'],headerName: 'Q2', field: 'q2r', width: 100, editable:this.edit, cellEditor: 'agLargeTextCellEditor'}, 
           { cellClass:['data'],headerName: 'Q3', field: 'q3r', width: 100, editable:this.edit, cellEditor: 'agLargeTextCellEditor'}, 
           { cellClass:['data'],headerName: 'Q4', field: 'q4r', width: 100, editable:this.edit, cellEditor: 'agLargeTextCellEditor'}, 
         ]
       },
     ]

     this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };

    this.columnTypes = {
      valueColumn: {
        width: 100,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell'
      },
      totalColumn: {
        aggFunc: 'sum',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell'
      }
    };

    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
  }

  ngOnInit() {
    this.lastUpdated();
  }

}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    // console.log(params.node);
    if (params.node.group && params.node.field === 'mfo_id') {
      // alert(params.node.field);
      
      tempDiv.innerHTML =
        '<span>' + params.node.allLeafChildren[0].data.mfo_name + '</span>';
    } else if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="font-weight: bold">' + params.value + '</span>';
    } else {
      // console.log(params);
      tempDiv.innerHTML = '<span>' + params.value + '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}
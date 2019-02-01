import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { districtDetailsDialog } from './districtDetailsDialog.component';
import { logDialog } from '../bed2/logDialog.component';

@Component({
  selector: 'anms-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  components: any;
  rowSelection: any;
  columnTypes: any;
  date_updated:any;

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getDistrict().subscribe(data => {
      this.rowData = data.data;
      console.log(this.rowData);
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

  updateLogs(id: number, value: number, col: string, month: string, beds: number,) {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("4 here");
    this.mfoService
      .updateLogs(id, value, uid.user_id, col, month, beds,null,null,null)
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
      beds: 4
    }});
  }

  lastUpdated() {
    this.mfoService.getLastUpdated(4).subscribe(data => {
      this.date_updated = data[0].date;
    });
  }

  onCellClicked(event){
    if(event.data!=undefined){
      console.log(event);
      var province = ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Province of Dinagat Islands", "Butuan City"];
      var prvnc = ["adn", "ads", "sdn", "sds", "pdi", "bxu"];
      for(var i=0;i<prvnc.length;i++){
        for(var ii=1;ii<=2;ii++){
          if(event.colDef.field==prvnc[i]+ii+"aaccomp"){
            console.log(prvnc[i]);
            console.log(ii);
            var tar = prvnc[i]+ii+"target";
            if(event.data[tar]==undefined){
              var mes="Error: No target in this location.";
              this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
            }else{
              console.log(event.data.mfo_id);
              var data={};
              data['province'] = province[i];
              data['district'] = ii;
              data['mfo_id'] = event.data.mfo_id;
              data['mfo_name'] = event.data.mfo_name;
              data['prvnc'] = prvnc[i];
              const dialogRef = this.dialog.open(districtDetailsDialog,{disableClose: true,data:data});

              dialogRef.afterClosed().subscribe(result=>{
                console.log(prvnc[i]+ii+"aarea");
                event.node.setDataValue(result.prvnc+result.district+"aarea",result.str);
                if(result.total>0)
                  event.node.setDataValue(result.prvnc+result.district+"aaccomp",result.total);
                else event.node.setDataValue(result.prvnc+result.district+"aaccomp","");

                this.lastUpdated();
              });
            }
            break;
          }
        }
      }
    }
  }

  constructor(private mfoService: MfoService, public dialog: MatDialog,private snackBar: MatSnackBar) { 
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
        rowGroup: true,
        hide: true
      },
      { headerName: 'Unit Measure', field: 'unitmeasure', width: 100 },
      { headerName: 'Accomplished', field: 'taccomp', width: 100, hide:false,
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
                  { headerName: 'Area', field: 'adn1area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'adn1target', width: 100, type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'adn1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'adn1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.adn1target) * Number(data.adn1cost)',valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'adn1aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'adn1aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { headerName: 'Area', field: 'adn2area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'adn2target', width: 100,  type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'adn2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { headerName: 'Total Cost', field: 'adn2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.adn2target) * Number(data.adn2cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'adn2aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'adn2aaccomp', width: 100,  type: 'valueColumn',},
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
                  { headerName: 'Area', field: 'ads1area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'ads1target', width: 100, type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'ads1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'ads1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.ads1target) * Number(data.ads1cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'ads1aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'ads1aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { headerName: 'Area', field: 'ads2area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'ads2target', width: 100,  type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'ads2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'ads2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.ads2target) * Number(data.ads2cost)', valueFormatter: this.currencyFormatter,},  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'ads2aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'ads2aaccomp', width: 100,  type: 'valueColumn',},
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
                  { headerName: 'Area', field: 'sdn1area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sdn1target', width: 100, type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'sdn1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'sdn1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.sdn1target) * Number(data.sdn1cost)',valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'sdn1aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sdn1aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { headerName: 'Area', field: 'sdn2area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sdn2target', width: 100,  type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'sdn2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter, },      
                  { headerName: 'Total Cost', field: 'sdn2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.sdn2target) * Number(data.sdn2cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'sdn2aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sdn2aaccomp', width: 100,  type: 'valueColumn',},
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
                  { headerName: 'Area', field: 'sds1area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sds1target', width: 100, type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'sds1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'sds1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.sds1target) * Number(data.sds1cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'sds1aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sds1aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
          { headerName: 'District 2',
            children:[   
              { headerName: 'Target', 
                children:[
                  { headerName: 'Area', field: 'sds2area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sds2target', width: 100,  type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'sds2cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'sds2totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.sds2target) * Number(data.sds2cost)', valueFormatter: this.currencyFormatter,},  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'sds2aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'sds2aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
      { headerName: 'Province of Dinagat Islands', 
        children:[
          { headerName: 'District 1',
            children:[   
              { headerName: 'Target', 
                children:[
                  { headerName: 'Area', field: 'pdi1area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'pdi1target', width: 100, type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'pdi1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'pdi1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.pdi1target) * Number(data.pdi1cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'pdi1aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'pdi1aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
      { headerName: 'Butuan City', 
        children:[
          { headerName: '',
            children:[   
              { headerName: 'Target', 
                children:[
                  { headerName: 'Area', field: 'bxu1area', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'bxu1target', width: 100, type: 'valueColumn',},      
                  { headerName: 'Unit Cost', field: 'bxu1cost', width: 100,columnGroupShow: 'open', valueFormatter: this.currencyFormatter,},      
                  { headerName: 'Total Cost', field: 'bxu1totalcost', width: 100,columnGroupShow: 'open', 
                    valueGetter:'Number(data.bxu1target) * Number(data.bxu1cost)', valueFormatter: this.currencyFormatter,
                  },  
                ]
              },
              { headerName: 'Accomplishment', 
                children:[
                  { headerName: 'Area', field: 'bxu1aarea', width: 100,columnGroupShow: 'open', },            
                  { headerName: 'Number', field: 'bxu1aaccomp', width: 100,  type: 'valueColumn',},
                ]
              }
            ]
          },
        ]
      },
      {
        headerName: 'Remarks', 
        children:[
          { headerName: 'Q1', field: 'q1r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
          { headerName: 'Q2', field: 'q2r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
          { headerName: 'Q3', field: 'q3r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
          { headerName: 'Q4', field: 'q4r', width: 100, editable:true, cellEditor: 'agLargeTextCellEditor'}, 
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
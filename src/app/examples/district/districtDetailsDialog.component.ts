import { Component, Input, OnInit, Inject } from '@angular/core';
import { MfoService } from '../services/mfo.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { concat } from 'rxjs/operators';
import { any } from 'bluebird';
import { isNull } from 'util';



@Component({
  template: `
  <h3 mat-dialog-title>{{data.mfo_name}}</h3>
  <em *ngIf="!data.t_a">Note: Valid entry must have "Area" and the "Target" and "Unit Cost" must be greater than 0</em>
  <mat-dialog-content>
  <div class="container">
  <ag-grid-angular 
    style="width: 100%; height: 400px;" 
    class="ag-theme-balham"
    [rowData]="rowData" 
    [columnDefs]="columnDefs"
    [enableColResize]="true"
    [rowSelection]="rowSelection"
    [enableSorting]="true"
    (cellClicked)="onCellClicked($event)"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
    >
  </ag-grid-angular>
    </div>
    <div class="row">
        <div  class="col-md-2">
                <button style="margin:5px;" mat-raised-button class="default" (click)="doneClicked(!data.t_a)"> Done </button> 
        </div>
        <div  class="col-md-10" *ngIf="!data.t_a">
            <button style="margin:5px;" mat-raised-button class="warning" (click)="onAddRow()"> Add Target</button> 
        </div>
    </div>
  </mat-dialog-content>

  `,
})
export class districtDetailsDialog implements OnInit{
    gridApi: any;
    rowData: any;
    columnDefs:any;
    rowSelection:any;
    t_a=false;
    datasample:any;

    constructor(private mfoService: MfoService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<districtDetailsDialog>, private snackBar: MatSnackBar){
        this.columnDefs = [
            {headerName: 'Area', field: 'municipal', width: 130,cellEditor:'agSelectCellEditor',cellEditorParams:{values: data.municipality[data.i][data.ii2]},
            editable: params => params.data.new},
            {headerName: 'Target', field: 'target', width: 80,editable:!data.t_a,},
            {headerName: 'Unit Cost', field: 'cost', width: 100,valueFormatter: this.currencyFormatter,editable:!(data.t_a), hide:data.t_a},
            {headerName: 'Total Cost', field: 'totalcost', width: 100,hide:data.t_a,valueGetter:'Number(data.target) * Number(data.cost)', valueFormatter: this.currencyFormatter},
            {headerName: 'Accomplishment', field: 'accomp', width: 100,editable:data.t_a, hide:!(data.t_a)},
            {headerName: 'Action', field: 'del', width: 80, hide:data.t_a, },
        ];
        this.rowSelection = "single";
    }

    onCellClicked(event){
        if(event.value==="Delete"){
            console.log(event);
            if(confirm("Are you sure to DELETE this item?")){
                var selectedData = this.gridApi.getSelectedRows();
                this.gridApi.updateRowData({ remove: selectedData });
            }
        }
    }

    onAddRow() {
        var newItem = {
            mfo_id: this.data.mfo_id,
            province: this.data.province,
            district: this.data.ii2+1,
            municipal: "",
            target: 0,
            accomp: 0,
            cost: 0,
            new: true,
            del: "Delete"
          };
        this.gridApi.updateRowData({ add: [newItem] });
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

    ngOnInit() {
         console.log(this.data);
         this.t_a = this.data.t_a;
         console.log(this.t_a);
         if(!this.t_a&&(this.data.val==undefined || this.data.val==0)){
            //do nothing
            this.rowData = [];
         }else{
            this.mfoService.getDistrictDetails(this.data).subscribe(data =>{
                this.rowData = data;
                console.log(this.rowData);
            });
        }
    }
    onGridReady(event){
        this.gridApi = event.api;
    }
    updateLogs(id: number, value: number, col: string, month: string, beds: number, prov: string, dist: string, mun: string) {
        const uid = JSON.parse(localStorage.getItem('currentUser'));
        // console.log("4 here");
        this.mfoService
          .updateLogs(id, value, uid.pid, col, month, beds,prov,dist,mun)
          .subscribe(data => console.log(data));
      }
    onCellValueChanged(event){
        console.log(event);
        if(event.value==event.oldValue){ console.log("same")}
        else if(event.colDef.field==="accomp"){
            if(isNaN(Number(event.oldValue))||event.data.target<Number(event.oldValue)){ 
                // revert
            }
            else{
                if(event.data.target<Number(event.data.accomp)||isNaN(Number(event.data.accomp))){
                    var mes="";
                    if(isNaN(Number(event.data.accomp))) mes="Error: Please entry a number less than or equal to the target.";
                    else mes = "Error: Accomplishment inputted is greater than the target.";
                    this.snackBar.open(mes, null, { duration: 3000, panelClass: 'error-notification-overlay'});
                    event.node.setDataValue(event.colDef.field,event.oldValue);
                }else{
                    console.log(event.data);
                    var data = event.data;
                    this.mfoService.updateDistrictDetails(data).subscribe(data =>{
                        this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.field, 4,event.data.province,event.data.district,event.data.municipal);
                    }); 
                }
            }
        }
        else{
            if(!event.data.new){
                // new target
                console.log(event);
                if(event.colDef.field === "target"){
                    if(Number(event.data.accomp)>event.value){
                        alert("This target has a corresponding accomplishment.\nPlease recheck accomplishment before updating.")
                        event.node.setDataValue(event.colDef.field,event.oldValue);
                    }
                    else if(Number(event.data.accomp)>event.oldValue || this.datasample==event.value){
                        //reverted
                    }
                    else{
                        var answer=null;
                        do{
                        answer = prompt("Please put remarks for the changes.\nNote: This is required.")
                        } while(answer==="");
                        if(isNull(answer)){
                            event.node.setDataValue(event.colDef.field,event.oldValue);
                            this.datasample = event.oldValue;
                            console.log(event);
                        }else{
                            console.log(event);
                            var data : any = {"data":{"target": event.value,"remarks":answer},"id":event.data.id};
                            console.log(data);
                            console.log("query here");
                            console.log("answer");
                            this.mfoService.updateDistrictDetailsTarget(data).subscribe(data =>{
                                console.log("success query");
                                //this.updateLogs(event.data.mfo_id, event.newValue, event.data.mfo_name, event.colDef.field, 4,event.data.province,event.data.district,event.data.municipal);
                            });
                        }
                    }
                }
            }
        }
    }
    doneClicked(t_a){
        console.log(t_a);
        //console.log("done clicked!");
        // for loop for all municipality then concat as one line & get 
        var children = this.gridApi.rowModel.rootNode.allLeafChildren;
        //console.log(children);
        var total=0;
        var str=""
        var err="";
        if(t_a){
            children.forEach(function(element,index) {
                if(element.data.municipal=="" || (Number(element.data.target)==0 || isNaN(Number(element.data.target))) || (Number(element.data.cost)==0 || isNaN(Number(element.data.cost))) ){
                    if(err==="") err = index+1;
                    else err=err+", "+index+1;
                } 
            });
            if(err===""){
                children.forEach(element => {
                        str = str+element.data.municipal+"("+element.data.accomp+"), ";
                        total=total+Number(element.data.target);
                        if(element.data.new){
                            delete element.data.new;
                            this.mfoService.addDistrictDetails(element.data).subscribe(data =>{
                                console.log("added");
                                console.log(element.data);
                            });
                        }
                });
                this.data.data.dist[this.data.i][this.data.ii]["text"] = str;
                this.data.data.dist[this.data.i][this.data.ii]["target"] = total;
                this.dialogRef.close({data:this.data.data});
            }
            else{
                this.snackBar.open("Error: Invalid date entry in line/s ("+err+")", null, { duration: 3000, panelClass: 'error-notification-overlay'});
            }
        }else{
            children.forEach(element => {
                var accomp = Number(element.data.accomp);
                if(accomp!=0 && !isNaN(accomp)){
                    str = str+element.data.municipal+"("+element.data.accomp+"), ";
                    total=total+accomp;
                }
            });
            console.log(this.data);
            this.data.data.dist[this.data.i][this.data.ii]["text2"] = str;
            this.data.data.dist[this.data.i][this.data.ii]["accomp"] = total;
            this.dialogRef.close({data:this.data.data});
        }
        
        console.log(err);
    }
}
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MfoService } from '../services/mfo.service';

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  template: `
    <h2 mat-dialog-title>ADD OBJECT</h2>
    <mat-dialog-content>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <p>
          <mat-form-field>
            <mat-select
              placeholder="Select Object"
              formControlName="object"
              required
            >
              <mat-option *ngFor="let object of objects" [value]="object">
                {{ object.object_id }} - {{ object.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </p>

        <p class="submitButtons">
          <button type="submit" color="primary" mat-button>ADD</button>
        </p>
      </form>
    </mat-dialog-content>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 500px;
      }
      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .submitButtons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `
  ]
})
export class AddObjectDialogComponent {
  objects: Object[] = [
    { object_id: '50201010-00', name: 'Travelling Expenses - Local' },
    { object_id: '50201020-00', name: 'Travelling Expenses - Foreign' },
    { object_id: '50202010-00', name: 'Training Expenses' },
    { object_id: '50202020-00', name: 'Scholarship Grants/Expenses' },
    { object_id: '50203010-00', name: 'Office Supplies Expenses' },
    { object_id: '50203010-01', name: 'ICT Office Supplies' },
    { object_id: '50203020-00', name: 'Accountable forms' },
    { object_id: '50203040-00', name: 'Animal/Zoological Supplies Expenses' },
    { object_id: '50203070-00', name: 'Drugs and Medicines Expenses' },
    {
      object_id: '50203080-00',
      name: 'Medical, Dental and Laboratory Supplies Expenses'
    },
    { object_id: '50203090-00', name: 'Fuel, Oil and Lubricants Expenses' },
    {
      object_id: '50203100-00',
      name: 'Agricultural and Marine Supplies Expenses'
    },
    {
      object_id: '50203130-00',
      name: 'Chemical and Filtering Supplies Expenses'
    },
    { object_id: '50203210-01', name: 'Machinery' },
    { object_id: '50203210-02', name: 'Office Equipment' },
    { object_id: '50203210-03', name: 'Semi-Expendable ICT' },
    { object_id: '50203210-04', name: 'Semi Exp - Agricultural and Forestry ' },
    { object_id: '50203210-07', name: 'Semi-Expendable Communication' },
    { object_id: '50203210-11', name: 'Semi-Exp.-Printing Equipment' },
    { object_id: '50203210-13', name: 'Semi-Exp.-Technical & Scientific' },
    { object_id: '50203210-99', name: 'SE-Other Machinery & Equipment' },
    { object_id: '50203220-01', name: 'Semi-Exp.-Furniture and Fixtures' },
    { object_id: '50203220-02', name: 'Books' },
    { object_id: '50203990-00', name: 'Other Supplies and Materials Expenses' },
    { object_id: '50204010-00', name: 'Water Expenses' },
    { object_id: '50204020-00', name: 'Electricity Expenses' },
    { object_id: '50205010-00', name: 'Postage and Courier Services' },
    { object_id: '50205020-01', name: 'Mobile' },
    { object_id: '50205020-02', name: 'Landline' },
    { object_id: '50205030-00', name: 'Internet Subscription Expenses' },
    {
      object_id: '50205040-00',
      name: 'Cable Satellite, Telegraph and Radio Expenses'
    },
    { object_id: '50206010-00', name: 'Awards/Rewards Expenses' },
    { object_id: '50206010-01', name: 'Awards/Rewards Expenses' },
    { object_id: '50206010-02', name: 'Rewards & Incentives' },
    { object_id: '50206020-00', name: 'Prizes' },
    { object_id: '50206020-02', name: 'Prizes' },
    { object_id: '50207010-00', name: 'Survey Expenses' },
    {
      object_id: '50207020-00',
      name: 'Research, Exploration and Development Expenses'
    },
    {
      object_id: '50210030-00',
      name: 'Extraordinary and Miscellaneous Expenses'
    },
    { object_id: '50211030-00', name: 'Consultancy Services' },
    { object_id: '50211990-00', name: 'Other Professional Services' },
    { object_id: '50212030-00', name: 'Security Services' },
    { object_id: '50212990-00', name: 'Other General Services' },
    { object_id: '50213020-99', name: 'RM - Other Land Improvements' },
    { object_id: '50213030-04', name: 'RM-Water Supply System ' },
    { object_id: '50213040-01', name: 'RM - Buildings' },
    { object_id: '50213040-99', name: 'RM - Other Structures' },
    { object_id: '50213050-01', name: 'RM - Machinery' },
    { object_id: '50213050-02', name: 'RM - Office Equipment' },
    {
      object_id: '50213050-03',
      name: 'RM - Information and Communication Technology Equipment'
    },
    {
      object_id: '50213050-04',
      name: 'RM - Agricultural and Forestry Equipment'
    },
    { object_id: '50213050-07', name: 'RM-Communication Equipment' },
    {
      object_id: '50213050-14',
      name: 'RM - Technical and Scientific Equipment'
    },
    { object_id: '50213060-01', name: 'RM - Motor Vehicles' },
    { object_id: '50213060-99', name: 'RM - Other Transportation Equipment' },
    { object_id: '50213070-00', name: 'RM - Furniture and Fixtures' },
    {
      object_id: '50213990-99',
      name: 'RM - Other Property, Plant and Equipment'
    },
    { object_id: '50214990-00', name: 'Subsidies - Others' },
    { object_id: '50215010-01', name: 'Taxes, Duties and Licenses' },
    { object_id: '50215020-00', name: 'Fidelity Bond Premiums' },
    { object_id: '50215030-00', name: 'Insurance Expenses' },
    { object_id: '50216010-00', name: 'Labor and Wages' },
    { object_id: '50299010-00', name: 'Advertising Expenses' },
    { object_id: '50299020-00', name: 'Printing and Publication Expenses' },
    { object_id: '50299030-00', name: 'Representation Expenses' },
    { object_id: '50299040-00', name: 'Transportation and Delivery Expenses' },
    { object_id: '50299050-01', name: 'Rents - Building and Structures' },
    { object_id: '50299050-03', name: 'Rents - Motor Vehicles' },
    { object_id: '50299070-00', name: 'Other Subscription Expenses' },
    { object_id: '50299080-00', name: 'Donations' },
    {
      object_id: '50299990-99',
      name: 'Other Maintenance and Operating Expenses'
    },
    { object_id: '50301040-00', name: 'FINEX' },
    { object_id: '50604020-99', name: 'Other Land Improvements' },
    { object_id: '50604030-01', name: 'Road Network' },
    { object_id: '50604030-04', name: 'Water Supply Systems' },
    { object_id: '50604040-01', name: 'Buildings' },
    { object_id: '50604040-99', name: 'Other Structures' },
    { object_id: '50604050-00', name: 'Machinery and Equipment Outlay' },
    { object_id: '50604050-01', name: 'Machinery' },
    { object_id: '50604050-02', name: 'Office Equipment' },
    { object_id: '50604050-03', name: 'Communication Equipment' },
    { object_id: '50604050-04', name: 'Agricultural and Forestry Equipment' },
    { object_id: '50604050-07', name: 'Communication Equipment' },
    { object_id: '50604050-14', name: 'Technical and Scientific Equipment' },
    { object_id: '50604050-99', name: 'Other Machinery and Equipment' },
    { object_id: '50604060-01', name: 'Motor Vehicles' },
    { object_id: '50604070-01', name: 'Furniture and Fixtures' },
    { object_id: '50604070-02', name: 'Books' },
    { object_id: '50604090-99', name: 'Other Property, Plant and Equipment' },
    { object_id: '50605010-01', name: 'Breeding Stocks' },
    { object_id: '50605010-02', name: 'Livestock' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddObjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mfoService: MfoService
  ) {
    console.log(data);
  }

  form: FormGroup = new FormGroup({
    object: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      console.log(this.data.data.mfo_id, this.form.value.object.object_id);
      this.mfoService
        .addObject(this.data.data.mfo_id, this.form.value.object.object_id)
        .subscribe(() => {
          this.data.gridApi.updateRowData({
            add: [
              {
                mfo_id: this.data.data.mfo_id,
                object_id: this.form.value.object.object_id,
                name: this.form.value.object.name,
                header_main: this.data.data.header_main,
                header_program: this.data.data.header_program,
                header_mfo: this.data.data.header_mfo,
                header_indicator: this.data.data.header_indicator,
                header_subindicator: this.data.data.header_subindicator
              }
            ]
          });
          this.dialogRef.close();
        });
    }
  }
}

export interface Object {
  object_id: string;
  name: string;
}

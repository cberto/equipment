import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossroadsComponent } from './pages/crossroads/crossroads.component';
import { EquipmentTypesComponent } from './pages/equipment-types/equipment-types.component';
import { ContractsComponent } from './pages/contracts/contracts.component';
import { RegionsComponent } from './pages/regions/regions.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { TableModule } from 'primeng/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalModule } from './crossroads/modal/modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DateConversionPipe } from './pipes/date-conversion.pipe';
import { BranchComponent } from './pages/branch/branch.component';
import { TasksAndAttentionComponent } from './pages/tasks-and-attention/tasks-and-attention.component';
import { GroupsMobilesComponent } from './pages/groups-mobiles/groups-mobiles.component';


@NgModule({
  declarations: [
    CrossroadsComponent,
    EquipmentTypesComponent,
    ContractsComponent,
    RegionsComponent,
    DashboardComponent,
    DateConversionPipe,
    BranchComponent,
    TasksAndAttentionComponent,
    GroupsMobilesComponent,
  ],
  exports: [
    CrossroadsComponent,
    EquipmentTypesComponent,
    ContractsComponent,
    RegionsComponent,
  ],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    TableModule,
    MatSlideToggleModule,
    ModalModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCheckboxModule
  ]
})
export class MaintainersModule { }

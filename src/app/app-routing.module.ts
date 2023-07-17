import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksAndAttentionComponent } from './maintainers/pages/tasks-and-attention/tasks-and-attention.component';

import { DashboardComponent } from './maintainers/pages/dashboard/dashboard.component';
import { CrossroadsComponent } from './maintainers/pages/crossroads/crossroads.component';
import { EquipmentTypesComponent } from './maintainers/pages/equipment-types/equipment-types.component';
import { ContractsComponent } from './maintainers/pages/contracts/contracts.component';
import { RegionsComponent } from './maintainers/pages/regions/regions.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BranchComponent } from './maintainers/pages/branch/branch.component';
import { GroupsMobilesComponent } from './maintainers/pages/groups-mobiles/groups-mobiles.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'crossroads',
    component: CrossroadsComponent
  },
  {
    path: 'equipment-types',
    component: EquipmentTypesComponent
  },
  {
    path: 'contracts',
    component: ContractsComponent
  },
  {
    path: 'regions',
    component: RegionsComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'tasksAndAttention',
    component: TasksAndAttentionComponent
  },
  {
    path: 'groups_mobiles',
    component: GroupsMobilesComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/

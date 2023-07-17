import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    TestComponent,
  ],
})
export class ModalModule { }

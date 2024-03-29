import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ReusableArrayPipesModule } from '@ngx-reusable/common/pipes';

import { MaterialTableComponent } from './table/table.component';
import { TransformPipe } from './pipes/transform.pipe';
import { RowindexPipe } from './pipes/rowindex.pipe';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    MaterialTableComponent,
    TransformPipe,
    RowindexPipe
  ],
  imports: [
    CommonModule,
    ReusableArrayPipesModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    MaterialTableComponent
  ]
})
export class ReusableTableModule { }

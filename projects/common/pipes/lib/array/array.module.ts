import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { JoinPipe } from './join.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    JoinPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    JoinPipe
  ]
})
export class ReusableArrayPipesModule { }

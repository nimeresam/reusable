import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvgPipe } from './avg.pipe';
import { MinPipe } from './min.pipe';
import { MaxPipe } from './max.pipe';



@NgModule({
  declarations: [
    AvgPipe,
    MinPipe,
    MaxPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvgPipe,
    MinPipe,
    MaxPipe
  ]
})
export class MathPipesModule { }

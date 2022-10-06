import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { ValuesPipe } from './values.pipe';
import { EntriesPipe } from './entries.pipe';



@NgModule({
  declarations: [
    KeysPipe,
    ValuesPipe,
    EntriesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeysPipe,
    ValuesPipe,
    EntriesPipe
  ]
})
export class ReusableObjectPipesModule { }

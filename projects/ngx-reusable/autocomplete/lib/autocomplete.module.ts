import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AsyncAutocompleteComponent } from './async-autocomplete/async-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AutocompleteComponent,
    AsyncAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    AutocompleteComponent,
    AsyncAutocompleteComponent
  ]
})
export class AutocompleteModule { }

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { BaseAutocompleteComponent } from '../base-autocomplete/base-autocomplete.class';
import { AutocompleteOption } from '../models/autocomplete-option.class';

@Component({
  selector: 'reuse-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutocompleteComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AutocompleteComponent
    }
  ]
})
export class AutocompleteComponent extends BaseAutocompleteComponent implements OnChanges {

  @Input() options!: any[];
  private _autocompleteOptions: AutocompleteOption[];

  constructor() { 
    super();

    this._autocompleteOptions = [];
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.options$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      map((value: string) => this._filter(value))
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      if (this.options) {
        this._autocompleteOptions = this.options.map(option => new AutocompleteOption(option, this.keyProperty, this.valueProperty));
      }
    }

    if (!changes['options'].previousValue?.length && this.value) {
      const option = this._autocompleteOptions.find(
        option => option.value == this.value
      );
      if (option) {
        this.selectionChange.emit(option);
        this.searchControl.setValue(option.key);
      }
    } else {
      this.clear();
    }
  }

  override writeValue(obj: any): void {
    super.writeValue(obj);
    if (obj === null || obj === undefined || obj === "") {
      this.searchControl.setValue(null, { emitEvent: false });
    }
  }

  private _filter(value: string): AutocompleteOption[] {
    if (typeof value !== 'string' && !value) return this._autocompleteOptions;
    value = value.toString().trim().toLowerCase();
    if (!value.length) return this._autocompleteOptions;
    return this._autocompleteOptions.filter(
      option => option.key.toLowerCase().includes(value)
    );
  }

}

import { Component, Input, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Params } from '@angular/router';
import { catchError, debounceTime, filter, lastValueFrom, map, mergeMap, Observable, Subject, Subscription, tap } from 'rxjs';
import { BaseAutocompleteComponent } from '../base-autocomplete/base-autocomplete.class';
import { AutocompleteOption } from '../models/autocomplete-option.class';

@Component({
  selector: 'reuse-async-autocomplete',
  templateUrl: './async-autocomplete.component.html',
  styleUrls: ['./async-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AsyncAutocompleteComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AsyncAutocompleteComponent
    }
  ]
})
export class AsyncAutocompleteComponent extends BaseAutocompleteComponent implements OnDestroy {

  showLoading: boolean;
  hasError?: string | boolean;

  private _optionsSubject: Subject<AutocompleteOption[]>;
  private _valueChangesSubscription?: Subscription;

  @Input() searchFn!: (params: any) => Observable<any[]>;
  @Input() findByValueFn!: ((value: any) => Observable<any>); 
  @Input() mapKeyToParamsFn!: (key: string) => Params | any;

  constructor() { 
    super();
    this.showLoading = false;
    this._optionsSubject = new Subject<AutocompleteOption[]>();
    this.options$ = this._optionsSubject.asObservable();
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this._valueChangesSubscription = this.searchControl.valueChanges.pipe(
      filter(val => val !== undefined),
      tap(_ => {
        this.showLoading = true;
        this.hasError = false;
      }),
      debounceTime(500),
      map((key: string) => this.mapKeyToParamsFn(key)),
      mergeMap(params => this.searchFn(params)),
      map(list => Array.isArray(list)? list: []),
      map(list => list.map<AutocompleteOption>(option => new AutocompleteOption(option, this.keyProperty, this.valueProperty))),
      tap(_ => {
        this.showLoading = false
      }),
      catchError(err => {
        this.hasError = typeof(err) === 'string'? err: "Failed to fetch options";
        return [];
      })
    ).subscribe(
      (list: AutocompleteOption[]) => this._optionsSubject.next(list)
    );
  }

  override writeValue(obj: any): void {
    super.writeValue(obj);
    setTimeout(async () => {
      if (obj === null || obj === undefined || obj === "") {
        this.searchControl.setValue(null, { emitEvent: false });
      } else {
        let value = await lastValueFrom(this.findByValueFn(obj))
        let option = new AutocompleteOption(value, this.keyProperty, this.valueProperty);
        this.selectOption(option);
      }
    })
  }

  override selectOption(option: AutocompleteOption): void {
    super.selectOption(option);
    this._optionsSubject.next([option]);
  }

  ngOnDestroy(): void {
    this._valueChangesSubscription?.unsubscribe();
  }

}

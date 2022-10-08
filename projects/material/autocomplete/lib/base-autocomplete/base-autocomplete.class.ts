import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormControl, ValidationErrors, Validator } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AutocompleteOption } from "../models/autocomplete-option.class";


@Component({
    template: ""
})
export class BaseAutocompleteComponent implements OnInit, ControlValueAccessor, Validator 
{
    @Input() appearance: 'standard' | 'fill' | 'outline';
    @Input() required: boolean;
    @Input() placeholder: string;
    @Input() type?: 'text' | 'number';
    @Input('key') keyProperty?: string;
    @Input('value') valueProperty?: string;

    options$!: Observable<AutocompleteOption[]>;
    searchControl: FormControl<string>;
    value: any;
    defaultValue: any;

    onChange: any = () => {};
    onTouched: any = () => {};
    onValidate: any = () => {};

    protected touched: boolean;

    @ViewChild('autocompleteInput') autocompleteInput!: ElementRef<HTMLInputElement>;
    @Output() selectionChange: EventEmitter<any>;

    constructor() {
        this.appearance = 'standard';
        this.required = false;
        this.placeholder = "";
        this.type = 'text';
        this.keyProperty = "";
        this.valueProperty = "";

        this.searchControl = new FormControl();
        this.touched = false;

        this.selectionChange = new EventEmitter();
    }
    
    async ngOnInit(): Promise<void> {}

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if(isDisabled) this.searchControl.disable();
        else this.searchControl.enable();
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        if (control.touched) this.markAsTouched();
        const errors = control.valid? null: control.errors;
        this.searchControl.setErrors(errors);
        this.searchControl.updateValueAndValidity({ emitEvent: false });
        return errors;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onValidate = fn;
    }

    public markAsTouched(): void {
        if (!this.touched) {
            this.onTouched();
            this.searchControl.markAsTouched();
            this.touched = true;
        }
    }

    protected selectOption(option: AutocompleteOption): void {
        this.selectionChange.emit(option.entire);
        this.markAsTouched();
        let { key, value } = option;
        this.searchControl.setValue(key, { emitEvent: false });
        if (this.type == 'number') value = Number(value);
        else value = value?.toString() || '';
        this.onChange(value);
        setTimeout(() => {
            // TODO: handle this issue
            // this.autocompleteInput?.nativeElement?.onblur();
        })
    }

    public clear(): void {
        this.searchControl.setValue('');
        this.onChange('');
        this.value = this.defaultValue;
        setTimeout(() => {
            // TODO: handle this issue
            // this.autocompleteInput?.nativeElement?.onblur();
        })
    }

}
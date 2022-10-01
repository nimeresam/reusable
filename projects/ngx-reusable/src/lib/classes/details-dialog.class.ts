import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IBase } from "../interfaces/base-entity.interface";
import { RESTfulService } from "./restful-service.class";


@Component({
    template: ""
})
export class DetailsDialog<T extends IBase> implements OnInit {
    formGroup!: FormGroup;
    previousValue?: T;

    get formValue(): T {
        return Object.assign(this.formGroup.value, this.previousValue) as T;
    }

    constructor(
        protected service: RESTfulService<T>,
    ) {}

    ngOnInit(): void {
        
    }

    cancel(): void {}

    async save(): Promise<void> {
        const value = this.formValue;
        await this.service.upsert(value).toPromise();
    }

    async saveThenClose(): Promise<void> {
        await this.save();

    }
}
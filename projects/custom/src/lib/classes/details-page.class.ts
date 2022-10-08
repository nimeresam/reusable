import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom, Observable } from "rxjs";
import { IBase } from "../interfaces/base-entity.interface";
import { RESTfulService } from "./restful-service.class";

@Component({
    template: ""
})
export class DetailsPage<T extends IBase> implements OnInit {

    protected formGroup!: FormGroup;
    protected element!: T;

    /**
     * get form value that used to upsert
     */
    get valueToSave(): T {
        return Object.assign(this.element, this.formGroup.value);
    }

    get lastValue$(): Observable<T> {
        throw new Error('Not Implemented Method');
    }
    
    constructor(
        protected service: RESTfulService<T>,
        protected router: Router,
        protected activatedRoute: ActivatedRoute
    ) {}
    
    async ngOnInit(): Promise<void> { 
        this.element = await lastValueFrom(this.lastValue$);
        this.formGroup.patchValue(this.element);
    }

    async save(): Promise<T> {
        return await lastValueFrom(this.service.upsert(this.valueToSave));
    }

    async saveThenClose(): Promise<void> {
        await this.save();
        this.back();
    }

    back(): void {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
}
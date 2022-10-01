import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, mergeMap, Observable, Subscription, tap } from "rxjs";
import { FormGroup } from "@angular/forms";

import { IBase } from "../interfaces/base-entity.interface";
import { RESTfulService } from "./restful-service.class";
import { IGetParams } from "../interfaces/get-params.interface";
import { IGetResponse } from "../interfaces/get-response.interface";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { SortDirection } from "../interfaces/sort-event.interface";

@Component({
    template: ""
})
export class MasterPage<T extends IBase> implements OnInit, OnDestroy {
    list: T[];
    queryParams: Params;
    pageEvent: PageEvent;
    searchForm?: FormGroup;
    sortEvent?: Sort;
    showLoading: boolean;
    hasError?: string | number | boolean | undefined;

    private _queryParamsSubscription?: Subscription;

    constructor(
        protected service: RESTfulService<T>,
        protected router: Router,
        protected activatedRoute: ActivatedRoute
    ) {
        this.list = [];
        this.queryParams = {};
        this.showLoading = true;
        this.pageEvent = {
            pageIndex: 0,
            length: 0,
            pageSize: 25
        };
    }

    ngOnInit(): void {
        this._queryParamsSubscription = this.activatedRoute.queryParams.pipe(
            tap(_ => this.showLoading = true),
            map(params => this.onParamsUpdated(params)),
            map(params => this.beforeFetchCalled(params)),
            mergeMap(params => this.fetch(params)),
            map(res => this.afterFetchCalled(res))
        ).subscribe(
            (res: IGetResponse<T>) => {
                this.showLoading = false;
                this.pageEvent.length = res.count;
                this.list = res.list;
            },
            err => {
                this.hasError = err;
                this.showLoading = false;
            }
        );
    }

    ngOnDestroy(): void {
        this._queryParamsSubscription?.unsubscribe();
    }

    search(): void {
        const queryParams = this.searchForm?.value;
        this.router.navigate([], { queryParams });
    }

    changePage(pageEvent: PageEvent): void {
        this.pageEvent = pageEvent;
        this.search();
    }

    changeSort(sort: Sort): void {
        this.sortEvent = sort;
        this.search();
    }

    /**
     * 
     * @param params 
     * @returns 
     */
    onParamsUpdated(params: IGetParams): IGetParams {
        // check and set pageIndex
        if (isNaN(params.pageIndex as number) || params.pageIndex as number < 0) delete params.pageIndex;
        if (params.pageIndex) this.pageEvent.pageIndex = params.pageIndex;
        // check and set pageSize
        if (isNaN(params.pageIndex as number) || params.pageSize as number < 1) delete params.pageSize;
        if (params.pageSize) this.pageEvent.pageSize = params.pageSize;
        // check and set orderBy
        if (params.orderBy && this.sortEvent) this.sortEvent.active = params.orderBy;
        // check and set order
        if (params.order) {
            // check if order type is invalid
            let isValid: boolean = (params.order == 'asc' || params.order == 'desc');
            if (!isValid) {
                if (params.orderBy) {
                    params.order = 'asc';
                    isValid = true;
                }
                else delete params.order;
            }

            if (isValid && this.sortEvent) this.sortEvent.direction = params.order as SortDirection;
        }
        return params;
    }

    /**
     * map activiatedRoute params before apply fetch
     * @param {Params} params original params
     * @returns {Params} modified version
     */
    beforeFetchCalled(params: Params): IGetParams {
        // set pageEvent and sortEvent
        let pageParams: IGetParams = { pageIndex: this.pageEvent.pageIndex, pageSize: this.pageEvent.pageSize };
        if (this.sortEvent?.active) pageParams.order = this.sortEvent.direction;
        if (this.sortEvent?.direction) pageParams.orderBy = this.sortEvent.direction;
        return Object.assign(params);
    }

    /**
     * GET method to call
     * @param {Params} params passed params from mapParams
     * @returns {Observable<IGetResponse<T>>}
     */
    fetch(params: Params): Observable<IGetResponse<T>> {
        return this.service.get(params) as Observable<IGetResponse<T>>;
    }

    /**
     * map API response before assign it's list 
     * @param {IGetResponse<T>} res original response
     * @returns {IGetResponse<T>}
     */
    afterFetchCalled(res: IGetResponse<T>): IGetResponse<T> {
        return res;
    }

    /**
     * @async
     * delete specific element of list by index
     * @param {number} index 
     */
    async delete(index: number): Promise<void> {
        var item = this.list[index];
        await this.service.deleteById(item.id).toPromise();
        this.list.splice(index, 1);
        this.list = this.list.slice(0);
    }
}
import { Params } from "@angular/router";
import { SortDirection } from "./sort-event.interface";

export interface IGetParams extends Params {
    pageIndex?: number;
    pageSize?: number;
    order?: SortDirection;
    orderBy?: string;
    _all?: boolean; 
}
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBase } from '../interfaces/base-entity.interface';
import { IGetParams } from '../interfaces/get-params.interface';
import { IGetResponse } from '../interfaces/get-response.interface';

export class RESTfulService<T extends IBase> {

    get url(): string {
        throw new Error("Not Implemented!");
    }
    
    constructor(protected http: HttpClient) {}

    /**
     * Apply get request 
     * @param {IGetParams} params 
     * @param {boolean} [listOnly=false]  
     * @returns {Observable<IGetResponse<T> | T[]>}
     */
    get(params: IGetParams, listOnly?: boolean): Observable<IGetResponse<T> | T[]> {
        return this.http.get<IGetResponse<T>>(this.url, { params }).pipe(
            map((res: IGetResponse<T>) => listOnly? res.list: res)
        );
    }

    /**
     * Apply get request 
     * @param {number | string} element id
     * @returns {Observable<IGetResponse<T> | T[]>}
     */
    getById(id: number | string): Observable<T> {
        return this.http.get<T>(this.url + '/' + id);
    }

    insert(record: T): Observable<T> {
        return this.http.post<T>(this.url, record);
    }

    update(record: T): Observable<T> {
        return this.http.post<T>(this.url, record);
    }

    upsert(record: T): Observable<T> {
        const method = record.id? this.update: this.insert;
        return method.call(this, record);
    }

    deleteById(id: number | string): Observable<void> {
        return this.http.delete<void>(this.url + '/' + id);
    }
}
export interface IGetResponse<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    list: T[];
}
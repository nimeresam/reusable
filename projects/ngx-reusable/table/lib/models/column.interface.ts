export interface TableColumn {
    title: string;
    property: '_index' | '_actions' | string;
    sortable?: boolean;
    ignore?: boolean;
    transform?: (val: any) => string;
}
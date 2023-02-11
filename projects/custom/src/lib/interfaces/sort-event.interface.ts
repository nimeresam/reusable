export interface Sort {
     /** The id of the column being sorted. */
     active: string;
     /** The sort direction. */
     direction: SortDirection;
}

export declare type SortDirection = 'asc' | 'desc' | '';
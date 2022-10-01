import { Pipe, PipeTransform } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Pipe({
  name: 'rowindex'
})
export class RowindexPipe implements PipeTransform {
  
  private _pageEvent: PageEvent;

  constructor() {
    this._pageEvent = {
      pageIndex: 0,
      pageSize: 25,
      length: 0
    };
  }

  transform(index: number, pageEvent: PageEvent = this._pageEvent): number {
    return (index + 1) + (pageEvent.pageIndex * pageEvent.pageSize);
  }

}

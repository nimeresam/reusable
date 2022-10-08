import { Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../models/column.interface';

@Component({
  selector: 'reuse-mat-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class MaterialTableComponent implements OnInit, OnChanges {
  @Input() list!: { [key: string ]: any }[];
  @Input() columns!: TableColumn[];
  @Input() pageEvent?: PageEvent;  
  @Input() sortEvent?: Sort;  

  displayColumns: string[];
  showIndex: boolean;
  showActions: boolean;

  @ContentChild('actionsTemplate') actionsTemplate: TemplateRef<any> = <any>{};
  @Output() sort: EventEmitter<Sort>;
  
  constructor() { 
    this.showIndex = false;
    this.showActions = false;
    this.displayColumns = [];
    this.sort = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']?.currentValue) {
      let displayColumns = [];
      for(let col of this.columns) {
        switch(col.property) {
          case '_index':
            this.showIndex = true;
            col.ignore = true;
            break;
          case '_actions':
            this.showActions = true;
            col.ignore = true;
            break;
          default:
            if (col.ignore) continue;
        }
        displayColumns.push(col.property);
        this.displayColumns = displayColumns;
      }
    }
  }

  onSort(event: Sort) {
    this.sort.emit(event);
  }
}

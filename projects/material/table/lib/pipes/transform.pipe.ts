import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../models/column.interface';


@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any, col: TableColumn): string {
    if (col.transform) return col.transform(value);
    return value;
  }

}

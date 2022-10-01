import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: { [key: string]: any }): any[] {
    if (typeof value !== 'object') throw new Error("Invalid value type");
    return Object.values(value);
  }

}

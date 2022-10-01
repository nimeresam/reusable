import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], property: string, operator: string, expected: string | number | boolean): any[] {
    if (!Array.isArray(list) || !list.length) return list;
    return list.filter(
      item => {
        let value = typeof item === 'object'? item[property]: item;
        switch(operator) {
          case '!=':
          case '<>':
            return value != expected;
          case '<=':
            return value <= expected;
          case '<':
            return value < expected;
          case '>=':
            return value >= expected;
          case '>':
            return value > expected;
          case '===':
            return value === expected;
          default:
            return value == expected;
        }
      }
    )
  }

}

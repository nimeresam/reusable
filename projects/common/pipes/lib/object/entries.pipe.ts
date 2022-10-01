import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entries'
})
export class EntriesPipe implements PipeTransform {

  transform(value: { [key: string]: any }): [string, any][] {
    if (typeof value !== 'object') throw new Error("Invalid value type");
    return Object.entries(value);
  }

}

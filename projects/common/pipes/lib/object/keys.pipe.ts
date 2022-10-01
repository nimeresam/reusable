import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: { [key: string]: any }): string[] {
    if (typeof value !== 'object') throw new Error("Invalid value type");
    return Object.keys(value);
  }

}

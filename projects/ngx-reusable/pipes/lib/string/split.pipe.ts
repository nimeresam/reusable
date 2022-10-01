import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, splitter = "", limit?: number): any[] {
    return value.split(splitter, limit);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avg'
})
export class AvgPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    return args.reduce((total, num) => total + num, value) / (1 + args.length);
  }

}

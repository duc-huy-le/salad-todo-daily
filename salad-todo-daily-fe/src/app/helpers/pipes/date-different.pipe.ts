import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifferent'
})
export class DateDifferentPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if (!value) return null;
    const currentDate = new Date();
    const givenDate = new Date(value);

    // Calculate the difference in milliseconds
    const differenceMs = currentDate.getTime() - givenDate.getTime();

    // Convert milliseconds to days
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24)) + 1;

    return differenceDays;
  }

}

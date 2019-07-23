import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'Quelques Secondes';
      }
      const intervals = {
        année: 31536000,
        mois: 2592000,
        sem: 604800,
        j: 86400,
        h: 3600,
        min: 60,
        s: 1
      };
      let counter;
      // tslint:disable-next-line:forin
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
            return counter + ' ' + i; // singular (1 day ago)
        }
      }
    }
    return value;
  }

}

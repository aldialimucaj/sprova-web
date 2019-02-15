import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from "lodash";

@Pipe({
  name: 'packageFilter',
  pure: false
})
export class PackageFilterPipe implements PipeTransform {

  transform(items: any[], filter?: any): any {
    if (!items) {
      return items;
    }

    return orderBy(items, ['isParent', 'title'], ['desc']);
  }

}

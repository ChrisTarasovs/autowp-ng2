import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuType'
})
export class MenuTypePipe implements PipeTransform {

    transform(items: Array<int>, id: int): Array<int> {
        return items.find(id);
    }


// id 0, 1, 11

}

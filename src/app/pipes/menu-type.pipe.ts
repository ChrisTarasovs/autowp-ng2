import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menuType'
})

export class MenuTypePipe implements PipeTransform {
     private ids: number[] = [1,2,3];

    transform(items: any[]): any {
     return items.filter((key: any) => {
      return this.ids.includes(key.id);
        });
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findById'
})
export class FindByIdPipe {
  transform(arr: any[], id: number) {
    return arr.find(x => x.id === id);
  }
}

import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // Pagination Options
  defaultPageSize = 20;

  pageSizeOptions: Array<number> = [5, 10, 20, 50];

  constructor() { }

  openSnack(snack: any, message: string, action: string, success: boolean): void {
    snack.open(message, action, {
      duration: 2000,
      panelClass: success ? [] : ['has-background-danger', 'has-text-white']
    });
  }

  changePageOptions(router: Router, options: { pageSize: number, pageIndex: number }) {
    router.navigate([], {
      queryParams: {
        perPage: options.pageSize,
        page: options.pageIndex + 1
      },
      replaceUrl: true,
      queryParamsHandling: 'merge'
    }).then();
  }

  verticalDropEvent(event: any, target: Array<any>) {
    const el = target[event.previousIndex];
    target.splice(event.previousIndex, 1);
    target.splice(event.currentIndex, 0, el);
  }

  diagonalDropEvent(event: any, target: Array<any>) {
    const itemElement = event.item.element.nativeElement;

    const column = Math.floor(event.container.element.nativeElement.clientWidth / itemElement.clientWidth);
    const row = Math.ceil(target.length / column);

    const itemDim = { witdh: itemElement.clientWidth, height: itemElement.clientHeight };

    let xIndex = Math.floor((event.distance.x + event.item._dragRef._pickupPositionInElement.x) / itemDim.witdh);
    let yIndex = Math.floor((event.distance.y + event.item._dragRef._pickupPositionInElement.y) / itemDim.height);

    xIndex = Math.min(Math.max(xIndex, -(event.previousIndex % column)), column - 1);
    yIndex = Math.min(Math.max(yIndex, -Math.floor(event.previousIndex / column)), row - 1);

    const index = (Math.floor(event.previousIndex / column) + yIndex) * column +
      ((event.previousIndex % column) + xIndex);

    const el = target[event.previousIndex];

    target.splice(event.previousIndex, 1);
    target.splice(index, 0, el);
  }

  reweight(target: Array<any>, key: string) {
    for (let i = 0; i < target.length; i++) {
      target[i][key] = i;
    }
  }

  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  deleteAlert(title: string, action: any) {
    swal.fire({
      title: title,
      icon: 'info',
      text: 'Bu Öğe Silinecek',
      confirmButtonText: 'Sil',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        action();
      }
    });

  }
}

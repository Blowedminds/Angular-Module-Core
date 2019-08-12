import { Injectable } from '@angular/core';

import swal from 'sweetalert2';

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

  changePageOptions(helpersService: any, options: { pageSize: number, pageIndex: number }) {
    helpersService.navigate([], {
      queryParams: {
        'page-size': options.pageSize,
        'page': options.pageIndex + 1
      }
    });
  }

  deleteAlert(title: string, action: any) {
    swal.fire({
      title: title,
      type: 'info',
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

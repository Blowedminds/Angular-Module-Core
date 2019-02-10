import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // Pagination Options
  defaultPageSize = 10;

  pageSizeOptions: Array<number> = [5, 10, 20, 50];

  constructor() { }

  openSnack(snack: any, response: any, success: boolean): void {
    snack.open(response.message, response.action, {
      duration: 2000,
      panelClass: success ? [] : ['has-background-danger', 'has-text-white']
    });
  }

  changePageOptions(helpersService: any, options: { pageSize: number, pageIndex: number }) {
    helpersService.navigate(['/articles'], {
      queryParams: {
        'page-size': options.pageSize,
        'page': options.pageIndex + 1
      }
    });
  }
}

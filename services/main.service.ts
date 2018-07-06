import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  openSnack(snack: any, response: any, success: boolean): void {
    snack.open(response.message, response.action, {
      duration: 2000,
      panelClass: success ? [] : ['has-background-danger', 'has-text-white']
    });
  }

}

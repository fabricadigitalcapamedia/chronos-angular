import { Injectable, NgZone } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class GridChronosService {

  constructor(private zone: NgZone) { }

  initializeDataTable(selector: string, options: any = {}): void {
    this.zone.runOutsideAngular(() => {
      $(() => {
        $(selector).DataTable(options);
      });
    });
  }
}

import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  @Input() toolbar: any = {};  
  @Input() hidden: Boolean = false;  
  //Falta calcular,imagenes,tour, f7, f8, kit
  public objTour: any = {};

  constructor(public loadingBar: LoadingBarService){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
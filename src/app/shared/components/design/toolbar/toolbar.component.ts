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
  
  ngOnInit(): void {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {    
    
    if (event.ctrlKey === true &&  event.key === "F9") {
      this.toolbar['new']()
    }
    else if (event.key === "F2") {
      this.toolbar['edit']()
    }
    else if (event.ctrlKey === true && event.key === "F12") {
      this.toolbar['delete']()
    }
    else if (event.ctrlKey === true && event.key=== "F10"){
      this.toolbar['save']()
    }
    else if (event.ctrlKey === true && event.key=== "F11"){
      this.toolbar['cancel']()
    }  
  }

}
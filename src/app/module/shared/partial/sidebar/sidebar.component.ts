import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/autentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems?: any[];
  @Input() nodes: any;
  constructor(private sidebarService: SidebarService, private router: Router, private autenticationService: AutenticationService) { 
    this.menuItems=sidebarService.menu;
    console.log(this.menuItems);
    sidebarService.ejecutar();
    
  }
  // menu:any[]
  ngOnInit(): void {

  }

  hasChildren(node: any): boolean {
    return this.nodes.some((n: { parent: any; }) => n.parent === node.id);
  }

  getChildren(parenId: number): any[] {
    return this.nodes.filter((n: { parent: any; }) => n.parent === parenId);
  }

  getLogout(){
    this.autenticationService.logout();
  }

}

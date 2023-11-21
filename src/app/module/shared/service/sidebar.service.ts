import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [{
    titulo: 'Configuracion',
    icon: 'nav-icon fas fa-tachometer-alt',
    submenu: [
      { titulo: 'Estimacion', url: 'estimaciones', icon: 'fa fa-users' },
      { titulo: 'Hallazgos', url: 'hallazgos', icon: 'fa fa-cubes' }
    ]
  }, {
    titulo: 'Prueba',
    icon: 'nav-icon fas fa-tachometer-alt',
    submenu: [
      { titulo: 'Estimacion', url: 'estimaciones', icon: 'fa fa-users' },
      { titulo: 'Hallazgos', url: 'hallazgos', icon: 'fa fa-cubes' }
    ]
  }]

  //menu: any[] =[{}];
  data = [
    { id: 1, titulo: 'Configuracion', icono: 'nav-icon fas fa-tachometer-alt', idparent: null },
    { id: 2, titulo: 'Estimación', icono: 'fa fa-users', idparent: 1,  path: 'estimaciones' },
    { id: 3, titulo: 'Hallazgos', icono: 'fa fa-cubes', idparent: 1, path: 'hallazgos' },
    { id: 4, titulo: 'Prueba', icono: 'nav-icon fas fa-tachometer-alt', idparent: null },
    { id: 5, titulo: 'Estimación', icono: 'fa fa-users', idparent: 4, path: 'estimaciones' },
    { id: 6, titulo: 'Hallazgos', icono: 'fa fa-cubes', idparent: 4,path: 'hallazgos' },
  ];

  constructor() { }
  ejecutar(){ 
    
    const result =this.transformToNestedJSON(this.data);
    //this.menu=result;
    console.log('eee',result)
  }


  transformToNestedJSON(data: any[]): any[] {
    const tree:any = [];
    data.forEach(item => {
      const pathArray = item.path ? item.path.split(',') : [];
      let currentLevel = tree;
      pathArray.forEach((id:any, index:any) => {
        if (!currentLevel[id]) {
          currentLevel[id] = { titulo: item.titulo, icono: item.icono, submenu: [] };
          if (index < pathArray.length - 1) {
            currentLevel[id].submenu = [];
          }
        }
        currentLevel = currentLevel[id].submenu;
      });
    });
    console.log('eee',tree)
    return Object.values(tree);
  }
}

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


  data = [
    { id: 1, titulo: 'Configuracion', icon: 'nav-icon fas fa-tachometer-alt', idparent: null,path: null  },
    { id: 2, titulo: 'Estimación', icon: 'fa fa-users', idparent: 1, path: 'estimaciones' },
    { id: 3, titulo: 'Hallazgos', icon: 'fa fa-cubes', idparent: 1, path: 'hallazgos' },
    { id: 4, titulo: 'Prueba', icon: 'nav-icon fas fa-tachometer-alt', idparent: null,path: null },
    { id: 5, titulo: 'Elfer', icon: 'fa fa-users', idparent: 4, path: null },
    { id: 6, titulo: 'Hallazgos', icon: 'fa fa-cubes', idparent: 5, path: 'hallazgos' },
    { id: 7, titulo: 'Eestimaciones', icon: 'fa fa-users', idparent: 4, path: 'estimaciones' },
    { id: 8, titulo: 'Seguridad', icon: 'nav-icon fas fa-tachometer-alt', idparent: null,path: 'estimaciones'  },
  ];
   
  constructor() { }

  ejecutar() {
    const idToElementMap: any = {};
    this.data.forEach(element => {
      idToElementMap[element.id] = { ...element, hijos: [] };
    });
    // Construir el árbol
    const arbolMenu: any = [];
    this.data.forEach(element => {
      if (element.idparent === null) {
        arbolMenu.push(idToElementMap[element.id]);
      } else {
        idToElementMap[element.idparent].hijos.push(idToElementMap[element.id]);
      }
    });

    return arbolMenu
  }


  transformToNestedJSON(data: any[]): any[] {
    const tree: any = [];
    data.forEach(item => {
      const pathArray = item.path ? item.path.split(',') : [];
      let currentLevel = tree;
      pathArray.forEach((id: any, index: any) => {
        if (!currentLevel[id]) {
          currentLevel[id] = { titulo: item.titulo, icono: item.icono, submenu: [] };
          if (index < pathArray.length - 1) {
            currentLevel[id].submenu = [];
          }
        }
        currentLevel = currentLevel[id].submenu;
      });
    });
    console.log('eee', tree)
    return Object.values(tree);
  }
}

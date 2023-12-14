import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  data = [
    { id: 1, titulo: 'Parametrizacion', icon: 'fa fa-cogs', idparent: null, path: null },
    { id: 2, titulo: 'Proyecto', icon: 'fa fa-folder-open', idparent: 1, path: 'proyecto' },
    { id: 3, titulo: 'Actividades', icon: 'fa fa-calendar', idparent: null, path: 'actividades' },
    { id: 4, titulo: 'Perfiles', icon: 'fa fa-address-book', idparent: null, path: null },
    { id: 5, titulo: 'Perfil', icon: 'fa fa-address-book', idparent: 4, path: 'perfil' },
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
    return Object.values(tree);
  }
}

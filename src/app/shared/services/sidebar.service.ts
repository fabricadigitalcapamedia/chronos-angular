import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  data = [
    { id: 1, titulo: 'Parametrizacion', icon: 'fa fa-cogs', idparent: null, path: null },
    { id: 2, titulo: 'Proyecto', icon: 'fa fa-folder-open', idparent: 1, path: 'proyecto' },
    { id: 3, titulo: 'Actividades', icon: 'fa fa-calendar', idparent: null, path: 'actividades' },
    { id: 4, titulo: 'Perfiles', icon: 'fa fa-address-book', idparent: 1, path: null },
    { id: 5, titulo: 'Perfil', icon: 'fa fa-address-book', idparent: 4, path: 'perfil' },
    { id: 6, titulo: 'Perfil Tipo', icon: 'fa fa-address-card', idparent: 4, path: 'perfilTipo' },
    { id: 7, titulo: 'Perfil Nivel', icon: 'fa fa-layer-group', idparent: 4, path: 'perfilNivel' },
    { id: 8, titulo: 'Linea Producto', icon: 'fa fa fa-archive', idparent: 4, path: 'lineaProducto' },
    { id: 9, titulo: 'Perfil Costo', icon: 'fa fa fa-building', idparent: 4, path: 'perfilCosto' },
    { id: 10, titulo: 'Terceros', icon: 'fa fa fa-archive', idparent: 1, path: 'terceros' },
    { id: 11, titulo: 'Tareas', icon: 'fa fa fa-tasks', idparent: 1, path: null },
    { id: 12, titulo: 'Tipo', icon: 'fa fa fa-tasks', idparent: 11, path: 'tareaTipo' },
    { id: 13, titulo: 'Tipo de Estados', icon: 'fa fa fa-share-alt-square', idparent: 11, path: 'tareaTipoEstado' },
    { id: 14, titulo: 'Estados', icon: 'fa fa fa-hourglass-start', idparent: 11, path: 'tareaEstado' },
    { id: 15, titulo: 'Modificar', icon: 'fa fa fa-book', idparent: 11, path: 'tareaModificar' }, 
    { id: 16, titulo: 'Estructura', icon: 'fa fa fa-book', idparent: 1, path: 'estructura' }, 
    { id: 17, titulo: 'Administracion', icon: 'fa fa fa-book', idparent: null, path: null }, 
    { id: 18, titulo: 'Proveedor', icon: 'fa fa fa-book', idparent: 17, path: 'proveedor' }, 
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

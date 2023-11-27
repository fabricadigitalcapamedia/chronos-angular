import { Component } from '@angular/core';
import { GanttItem } from '@worktile/gantt';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],

})
export class GanttComponent {
  tasks: any[]; // Matriz de tareas
  dates: any[]; // Matriz de fechas (días, meses, años)
  ganttData: any[]; // Matriz de fechas (días, meses, años)
  items: GanttItem[] = [
    { id: '000000', title: 'Task 0', start: 0, end: 1628421197 },
    { id: '000001', title: 'Task 1', start: 0, end: 1625483597 }
  ];
  constructor() {
    this.tasks = [
      {
        name: 'Proyecto A',
        startDate: 100, // Posición X del rectángulo
        duration: 200,  // Ancho del rectángulo
        color: 'blue'   // Color del rectángulo
      },
      {
        name: 'Proyecto B',
        startDate: 50,
        duration: 150,
        color: 'green'
      },
      // Agrega más proyectos aquí
    ];
    this.dates = [
      { x: 50, label: '01/01/2023' },
      { x: 100, label: '02/01/2023' },
      { x: 150, label: '03/01/2023' },
      // Agrega más fechas aquí
    ];

    this.ganttData = [
      {
        name: 'Tarea 1',
        series: [
          {
            name: 'Progreso',
            start: new Date('2023-01-01'),
            end: new Date('2023-01-05'),
          },
        ],
      },
      // Otras tareas
    ];

  }
}


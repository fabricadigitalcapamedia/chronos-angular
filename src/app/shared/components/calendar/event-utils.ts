import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {id: '37640', title: 'MSAngularGrillaBase/DesarrolloV6', start: '2023-12-01T08:00:00', end: '2023-12-01T18:00:00'},
{id: '37642', title: 'MsChronosAdmin/Soporte', start: '2023-12-04T08:00:00', end: '2023-12-04T18:00:00'},
{id: '37646', title: 'MSAngularCalendario/Desarrollo', start: '2023-12-05T08:00:00', end: '2023-12-05T18:00:00'},
{id: '37647', title: 'MSAngularCalendario/DesarrolloV2', start: '2023-12-06T08:00:00', end: '2023-12-11T18:00:00'},
{id: '37648', title: 'MSAngularCalendario/Pruebas', start: '2023-12-07T08:00:00', end: '2023-12-07T18:00:00'},
{id: '37927', title: 'MSAngularActividades/Desarrollo', start: '2023-12-12T08:00:00', end: '2023-12-12T18:00:00'},
{id: '37929', title: 'MSAngularActividades/Desarrollov1', start: '2023-12-13T08:00:00', end: '2023-12-13T18:00:00'} ,
{id: '37930', title: 'MSAngularActividades/Desarrollov2', start: '2023-12-14T08:00:00', end: '2023-12-14T18:00:00'},
{id: '37931', title: 'MSAngularActividades/DesarrolloV3', start: '2023-12-15T08:00:00', end: '2023-12-19T18:00:00'},
{id: '37933', title: 'MSAngularActividades/Pruebas', start: '2023-12-18T08:00:00', end: '2023-12-18T18:00:00', backgroundColor: 'blue'},
{id: '38151', title: 'MSAngularActividades/Desarrollo V4', start: '2023-12-20T08:00:00', end: '2023-12-29T18:00:00'}
];

export function createEventId() {
  return String(eventGuid++);
}

import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
  })
export class UtilsService {
    constructor(private datePipe: DatePipe) {}
    cambiarFormatoFecha(fecha: any, formatoEntrada: string, formatoSalida: string): string {
        //try{
            if(!fecha){
                return '';
            }
            const fechaObj = new Date(fecha);
            const fechaFormateada = this.datePipe.transform(fechaObj, formatoEntrada);
            const fechaSalida = this.datePipe.transform(fechaFormateada, formatoSalida);
        
            return fechaSalida || '';
        /*}catch{
            console.log(fecha);
            return '';
        }*/
      }

}
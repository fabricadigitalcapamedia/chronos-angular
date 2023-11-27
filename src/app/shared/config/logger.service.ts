import { Injectable } from '@angular/core';
import {  NGXLogger } from 'ngx-logger';
@Injectable({
    providedIn: 'root'
  })
  export class LoggerService {
  
    constructor(private logger: NGXLogger){
      
    }

    

    private winLog(level: string, message: string, meta: any, context?: string ){
      
        const metadata = typeof meta === 'object' ? meta : undefined;
        this.logger.log(level, message, {
            ...metadata,
            timestamp: new Date().toISOString(),
            methodName: context,
        });
    }

    log(message: string, meta: any, context?: string): void {
      this.winLog('info', message, meta, context); 
    }
  
    error(message: string, meta: any, context?: string): void {
        this.winLog('info', message, meta, context);  
    }
  
   
  
    // Puedes añadir métodos adicionales según sea necesario para tu aplicación
  }
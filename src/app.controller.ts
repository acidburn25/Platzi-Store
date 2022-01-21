import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /*Crear Endpoints*/
  @Get()
  getHello(): string {
    return 'Hola mundo';
  }

  @Get('nuevo')
  newEndpoint() {
    return 'Yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
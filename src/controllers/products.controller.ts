import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res
} from '@nestjs/common';

import { response, Response } from 'express';

import { ProductsService } from './../services/products.service';

import { ParseIntPipe } from './../common/parse-int.pipe';

import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }
  /*Colocar los endpoints no dínamicos primero*/
  @Get('filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`,
    };
  }

  /*Customizar los status del response*/
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    //response.status(200).send({
    //  message: `product ${productId}`,
    //});
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    //return {
    //  message: 'accion de crear',
    //  payload,
    //};
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
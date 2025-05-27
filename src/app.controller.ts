import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EncryptRequestDto } from './dto/encrypt-request.dto';
import { DecryptRequestDto } from './dto/decrypt-request.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('get-encrypt-data')
  @ApiResponse({ status: 200 })
  encryptData(@Body() body: EncryptRequestDto) {
    return this.appService.encryptData(body.payload);
  }

  @Post('get-decrypt-data')
  @ApiResponse({ status: 200 })
  decryptData(@Body() body: DecryptRequestDto) {
    return this.appService.decryptData(body);
  }
}

import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptRequestDto {
  @ApiProperty({ maxLength: 2000, example: 'test string' })
  @IsString()
  @Length(0, 2000)
  payload: string;
}

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptRequestDto {
  @ApiProperty({
    example:
      'QWMYtOF1uwBEogabLWNI2ZsmndTQakof1nfBgtAhC7YOxCV1/LjfZIJ84prnLY5thGxhTG29xDWsoyL3sVsL0xCGz/oXRUlcaLWPzJ0aU581cNeysrKefWhL7gfA0QqZPmA2J9ZODCk+VXYCJSnikJFwaWJme2V3QyBbC0GtSALjCRDe2J8DtklIf7yRPNtWlc71jD2bPeItHJG4C8HEudh1ZGrxoxpEFpz3Y2tRRCvdQniR7TL0vGM9DJZecK3GI3xOvT0NSlahC79fTr+3x2kmpyBZy1wzARpZ8dtNF3XL9LqC1lTDFMJMWNBg9Gqoi1hRlfHD4Gixh5knTdaMyA==',
  })
  @IsString()
  data1: string;

  @ApiProperty({ example: 'FZXMdIn4H+BaM38V6lhdZQ==:dvv4Jjh4K6iYpvvik39G5g==' })
  @IsString()
  data2: string;
}

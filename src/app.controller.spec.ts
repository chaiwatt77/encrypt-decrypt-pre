import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';
import { EncryptRequestDto } from './dto/encrypt-request.dto';
import { DecryptRequestDto } from './dto/decrypt-request.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(() => {
    const privateKeyPath = path.join(__dirname, '../pem-keys/private.pem');
    const publicKeyPath = path.join(__dirname, '../pem-keys/public.pem');
    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      throw new Error('PEM keys not found. Ensure test keys are available.');
    }
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Encryption/Decryption', () => {
    const testPayload = 'Hello, this is a test message!';

    it('should encrypt and decrypt the data correctly', () => {
      const encryptDto: EncryptRequestDto = { payload: testPayload };
      const encryptedResponse = appController.encryptData(encryptDto);

      expect(encryptedResponse.successful).toBe(true);
      expect(encryptedResponse.data).toBeDefined();

      if (!encryptedResponse.data?.payload) {
        fail('No payload returned from encryption');
        return;
      }

      const { data1, data2 } = encryptedResponse.data.payload;
      expect(typeof data1).toBe('string');
      expect(typeof data2).toBe('string');

      const decryptDto: DecryptRequestDto = { data1, data2 };
      const decryptedResponse = appController.decryptData(decryptDto);

      expect(decryptedResponse.successful).toBe(true);
      expect(decryptedResponse.data).toBeDefined();
      expect(decryptedResponse.data?.payload).toBe(testPayload);
    });

    it('should fail on invalid decryption input', () => {
      const badDto: DecryptRequestDto = {
        data1: 'invalidData1',
        data2: 'invalidData2',
      };
      const response = appController.decryptData(badDto);
      expect(response.successful).toBe(false);
      expect(response.error_code).toBeDefined();
    });

    it('should return failure when payload is not a string', () => {
      const badPayload = { payload: 12345 } as unknown as EncryptRequestDto;
      const response = appController.encryptData(badPayload);
      expect(response.successful).toBe(false);
      expect(response.error_code).toBeDefined();
    });
  });
});

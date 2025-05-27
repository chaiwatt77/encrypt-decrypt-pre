import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private privateKey = fs.readFileSync(
    path.join(__dirname, '../pem-keys/private.pem'),
    'utf8',
  );
  private publicKey = fs.readFileSync(
    path.join(__dirname, '../pem-keys/public.pem'),
    'utf8',
  );

  encryptData(payload: string) {
    try {
      const aesKey = crypto.randomBytes(32);
      const initializationVector = crypto.randomBytes(16);

      const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        aesKey,
        initializationVector,
      );
      let encrypted = cipher.update(payload, 'utf8', 'base64');
      encrypted += cipher.final('base64');

      const aesEncrypted =
        initializationVector.toString('base64') + ':' + encrypted;

      const encryptedKey = crypto
        .privateEncrypt(this.privateKey, aesKey)
        .toString('base64');

      return {
        successful: true,
        data:
          encryptedKey && aesEncrypted
            ? {
                payload: {
                  data1: encryptedKey,
                  data2: aesEncrypted,
                },
              }
            : null,
      };
    } catch (err: unknown) {
      const error = err as { code?: string };
      return {
        successful: false,
        error_code: error.code === 'ERR_INVALID_ARG_TYPE' ? '400' : error.code,
      };
    }
  }

  decryptData(data: { data1: string; data2: string }) {
    try {
      const aesKey = crypto.publicDecrypt(
        this.publicKey,
        Buffer.from(data.data1, 'base64'),
      );

      const [ivBase64, encryptedText] = data.data2.split(':');
      const initializationVector = Buffer.from(ivBase64, 'base64');
      const encryptedData = Buffer.from(encryptedText, 'base64');

      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        aesKey,
        initializationVector,
      );
      let decrypted = decipher.update(encryptedData, undefined, 'utf8');
      decrypted += decipher.final('utf8');

      return {
        successful: true,
        data: decrypted ? { payload: decrypted } : null,
      };
    } catch (err: unknown) {
      const error = err as { code?: string };
      return {
        successful: false,
        error_code: error.code === 'ERR_INVALID_ARG_TYPE' ? '400' : error.code,
      };
    }
  }
}

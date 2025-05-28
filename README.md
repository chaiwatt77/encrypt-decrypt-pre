## 🔐 Encrypt/Decrypt API Service
A simple NestJS HTTP service to encrypt and decrypt data using RSA keys.

📌 Non-Functional Requirements
✅ Unit Testing — implemented using Jest

✅ NestJS Framework — scalable and maintainable HTTP server

✅ Swagger Documentation — available at /api-docs for testing and exploration

🚀 Getting Started
1. Install Dependencies
```
npm install
```
2. Start the Server
```
npm run start
```
Once running, you can explore the API via Swagger UI:

👉 http://localhost:3000/api-docs

3. Run Tests
```
npm run test
```

🔑 Configuration
The service uses RSA public/private key encryption. You can generate keys at:

🔗 https://cryptotools.net/rsagen

Replace the default keys with your own if needed.

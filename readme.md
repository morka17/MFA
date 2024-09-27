#  Multi-Factor Authentication (MFA) Implementation in Node.js (TypeScript) - GraphQL & REST API

This project provides an open-source Node.js implementation of multi-factor authentication (MFA) in both GraphQL and REST APIs using TypeScript. It includes a variety of common MFA methods such as SMS-based OTP, Authenticator Apps, FIDO2/U2F, push notifications, biometric authentication, backup codes, and email-based authentication.


## Features
1. __SMS-Based Authentication (OTP):__ Implements one-time password generation and verification via SMS.
2. __Authenticator Apps:__ Supports time-based one-time passwords (TOTP) through apps like Google Authenticator and Authy.
3. __Hardware Security Keys (FIDO2/U2F):__ Provides hardware-based authentication using security keys like YubiKey.
4. __Biometric Authentication:__ Integrates platform-level biometric authentication using Face ID or Touch ID.
5. __Push Notification-Based MFA:__ Utilizes push notifications for approval-based authentication.
6. __Backup Codes:__ Allows users to generate backup codes in case they lose access to primary MFA methods.
7. __Email-Based MFA:__ Sends a one-time password via email for secondary authentication.
8. __Platform-Specific MFA:__ GitHub-like MFA via mobile or desktop notifications.

## Table of Contents
1. <a>Installation</a>
2. <a>Configuration</a>
3. <a>Endpoints</a>
   - <a>SMS-Based OTP</a>
   - <a>Authenticator Apps</a>
   - <a>Hardware Security Keys</a>
   - <a>Biometric Authentication</a>
   - <a>Push Notification-Based MFA</a>
   - <a>Backup Codes</a>
   - <a>Email-Based MFA</a>
4. <a>GraphQL API</a>
5. <a>REST API</a>
6. <a>Error Handling</a>
7. <a>License</a>


## __Installation__
## Prerequisites
- Node.js v14+ (LTS)
- TypeScript v4+
- PostgreSQL (or any supported database)
- Redis (optional, for caching or sessions)
- Twilio (or another SMS gateway) for SMS-based OTP
- Authy or similar service for authenticator app - functionality
- WebAuthn/FIDO2 libraries for hardware key support


## Steps
1. __Clone the Repository:__
    ```bash 
    git clone https://github.com/your-repo/mfa-implementation-nodejs.git
    cd mfa-implementation-nodejs
    ```
2. __Install Dependencies:__
    ```bash 
    npm install
    ```
3. __Setup Environment Variables:__ Create a .env file at the root of your project with the following:
    ```env 
    DATABASE_URL=your_postgresql_database_url
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    AUTHY_API_KEY=your_authy_api_key
    FIDO2_RP_ID=your_fido2_rp_id
    FIDO2_RP_NAME=your_fido2_rp_name
    PUSH_NOTIFICATION_API_KEY=your_push_notification_key
    EMAIL_SERVICE_API_KEY=your_email_service_key

    ```
4. __Database Migration:__
   ```bash 
    npx prisma migrate dev
   ```

5. __Start the Server:__
   ```bash 
    npm run dev
   ```


## __Configuration__
## _Environment Variables_
The application relies on the following environment variables:

- `DATABASE_URL`: Connection string for PostgreSQL or any other relational database.
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: Required for sending SMS-based OTPs.
- `AUTHY_API_KEY`: For integrating authenticator apps like Authy.
- `FIDO2_RP_ID` and `FIDO2_RP_NAME`: Relying party information for WebAuthn-based hardware security keys.
- `PUSH_NOTIFICATION_API_KEY`: Used for sending push notifications.
- `EMAIL_SERVICE_API_KEY`: Email service credentials to send OTPs for email-based MFA.

## __Endpoints__
##  SMS-Based OTP
### REST API
- __Endpoint:__ `/api/v1/mfa/sms/send`
- __Method:__ POST
- __Payload:__
```json
{
  "phone": "+1234567890"
}
 ```
- __Response:__
```json 
{
  "message": "OTP sent successfully"
}
```
- __Endpoint:__ `/api/v1/mfa/sms/verify`
- __Method:__ POST 
- __Payload:__
```json 
{
  "phone": "+1234567890",
  "otp": "123456"
}
 ````
- __Response:__
```json 
{
  "message": "OTP verified successfully"
}
```

## Authenticator Apps
### REST API
- __Endpoint:__ `/api/v1/mfa/authenticator/generate`
- __Method:__ GET
- __Response:__
```json
{
  "secret": "YOUR_SECRET",
  "qrCode": "BASE64_ENCODED_QR_CODE"
}
```
- __Endpoint:__  `/api/v1/mfa/authenticator/verify`
- __Method:__ POST 
- __Payload:__
```json 
{
  "token": "123456"
}
```
- __Response:__
```json 
{
  "message": "Authenticator token verified successfully"
}
```
## Hardware Security Keys (FIDO2/U2F)
### REST API
- __Endpoint:__ `/api/v1/mfa/webauthn/register`

- __Method:__ POST
- __Payload:__
```json 
{
  "userId": "your_user_id"
}
```
- __Response:__
```json 
{
  "publicKeyCredentialOptions": { /* FIDO2 options for registration */ }
}
```
- __Endpoint:__ `/api/v1/mfa/webauthn/verify`
- __Method: POST 
- __Payload:__
```json 
{
  "userId": "your_user_id",
  "authenticatorResponse": {/* WebAuthn response */}
}
```
## Biometric Authentication
### GraphQL API
- __Mutation:__
```graphql
mutation BiometricLogin($input: BiometricLoginInput!) {
  biometricLogin(input: $input) {
    token
    user {
      id
      email
    }
  }
}
```
- __Payload:__
```json 
{
  "input": {
    "fingerprint": "base64_fingerprint_data"
  }
}
```
## Push Notification-Based MFA
### REST API
- __Endpoint:__ `/api/v1/mfa/push`
- __Method:__ POST
- __Payload:__
```json 
{
  "userId": "your_user_id"
}
```
- __Response:__
```json 
{
  "message": "Push notification sent"
}
```
## Backup Codes
### REST API
- __Endpoint:__ `/api/v1/mfa/backup/generate`

- __Method:__ GET

- __Response:__
```json
{
  "backupCodes": ["code1", "code2", "code3"]
}
```
- __Endpoint:__ `/api/v1/mfa/backup/verify`

- __Method:__ POST

- __Payload:__
```json 
{
  "code": "backup_code"
}
```
- __Response:__
```json 
{
  "message": "Backup code verified successfully"
}
```
## Email-Based MFA
### REST API
- __Endpoint:__ `/api/v1/mfa/email/send`

- __Method:__ POST

- __Payload:__
```json 
{
  "email": "user@example.com"
}
```
- __Response:__
```json 
{
  "message": "Email OTP sent successfully"
}
```
- __Endpoint:__ `/api/v1/mfa/email/verify`
- __Method:__ POST
- __Payload:__
```json 
{
  "email": "user@example.com",
  "otp": "123456"
}
```
- __Response:__
```json
{
  "message": "Email OTP verified successfully"
}
``` 
## GraphQL API
This project supports GraphQL for seamless integration.

### Example Query
```graphql 
mutation SendOTP($input: SendOTPInput!) {
  sendOTP(input: $input) {
    success
    message
  }
}
```
### Example Query
```graphql 
mutation VerifyOTP($input: VerifyOTPInput!) {
  verifyOTP(input: $input) {
    success
    message
  }
}
```
### REST API
This project also supports a fully functional RESTful API for easier integration into various services.

### Error Handling
All requests return standardized error codes and messages to ensure consistent handling on the client side.

### License
This project is licensed under the MIT License.

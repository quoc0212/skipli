# Skipli BE

## Create .env file
Create file with name .env

```bash
TWILIO_ACCOUNT_SID=<YOUR_TWILIO_ACCOUNT_SID>
TWILIO_AUTH_TOKEN=<YOUR_TWILIO_AUTH_TOKEN>
TWILIO_FROM_NUMBER=<YOUR_TWILIO_FROM_NUMBER>
TWILIO_TO_NUMBER=<YOUR_TWILIO_TO_NUMBER>
GITHUB_ACCESS_TOKEN=<YOUR_GITHUB_ACCESS_TOKEN>
FIREBASE_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
```
## Download serviceAccountKey.json file
Create serviceAccountKey.json from Firebase Console and store at /server/serviceAccountKey.json

## Installation

Install all dependencies with:

```bash
npm install
```

## Run app

Run app with:

```bash
npm start
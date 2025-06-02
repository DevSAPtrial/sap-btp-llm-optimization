# SAP BTP LLM Optimization - Node.js CAP Project

This project demonstrates a complete SAP CAP Node.js app integrating GPT-4o via SAP AI Core.

## Features
- CDS data model for prompt and response
- CAP service with caching and persistence
- Simple UI5 frontend to interact with the GPT model
- Ready to deploy on SAP BTP

## Setup Instructions

1. Clone the repository
2. Copy `.env.sample` to `.env` and add your SAP AI Core token
3. Install dependencies
   ```bash
   npm install
   ```
4. Run locally
   ```bash
   npm start
   ```
5. Access the UI at `http://localhost:4004/app/index.html`

## Deployment to SAP BTP

- Use `cds deploy` commands
- Configure your SAP BTP subaccount and HANA database connection
- Deploy the app to your SAP BTP subaccount

## Notes
- Replace the SAP AI Core endpoint and token with actual values from your SAP BTP environment.
- Adjust the frontend fetch URL according to your service path in deployment.

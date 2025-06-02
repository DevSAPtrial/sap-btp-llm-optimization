# SAP BTP LLM Optimization - Node.js CAP App
This project demonstrates integrating OpenAI GPT-4o with SAP BTP AI Core in a CAP application, featuring caching, persistence, and monitoring.

## Features
- Connects to GPT-4o via SAP AI Core
- Implements caching with NodeCache
- Stores prompt/response in HANA or SQLite
- Ready for BTP deployment

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create `.env` with your SAP AI Core token.
4. Start the app: `cds run`
5. Call the `getGPTResponse` action via REST or CAP UI.

## Deployment
Adapt the endpoint and deploy to your SAP BTP subaccount with SAP HANA or SQLite.

## License
MIT
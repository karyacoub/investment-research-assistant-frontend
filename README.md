# Investment Research Assistant (IRA) Frontend
An LLM-driven asssitant that helps you invest smarter.

## Prerequisites
 * Node.js >= v22.17.1
 * npm >= v11.4.2
 * The associated [backend app](https://github.com/karyacoub/investment-research-assistant-backend) is running.

## Local Setup
 1. Open the project directory in your terminal.
 2. Intall dependencies:
    ```
    npm install
    ```
 3. Start the development server:
    ```
    npm run dev
    ```
 4. (Optional) Enable mock data for testing:
      * The Alpha Vantage free tier only allows up to 25 API calls per day. 
      * If you want to avoid exhausting your quota, set `mockEnabled` to `true` in `MainPage.tsx`. This will use pre-defined mock responses instead of calling the LLM agent and its tools.
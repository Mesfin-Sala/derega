// helpers/paypal.js
const paypal = require("@paypal/checkout-server-sdk");

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_ID;

const isLive = process.env.PAYPAL_MODE === "live";
const environment = isLive
  ? new paypal.core.LiveEnvironment(clientId, clientSecret)
  : new paypal.core.SandboxEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(environment);

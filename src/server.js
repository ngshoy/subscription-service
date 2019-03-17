const express = require('express');
const dotenv = require('dotenv');
const Middleware = require('./middleware/middleware');
const ErrorHandlingMiddleware = require('./middleware/error-handling');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

const PlansController = require('./controllers/plans-controller');
const SubscriptionsController = require('./controllers/subscription-controller');

Middleware(app);

app.use('/api/plans', PlansController);
app.use('/api/subscriptions', SubscriptionsController);

ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
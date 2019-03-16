const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

const PlansController = require('./controllers/plans-controller');
const SubscriptionController = require('./controllers/subscription-controller');

app.use('api/plans', PlansController);
app.use('api/subscription', SubscriptionController);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
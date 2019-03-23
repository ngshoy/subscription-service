const AMQP_CONNECTION_URL = 'amqp://mmysyyfa:8WkaqxT4Ufn1-OwEMt3n6PAn5P61cOm3@llama.rmq.cloudamqp.com/mmysyyfa';
const AMQP_CHANNEL_NAME = 'PAYMENTS_GATEWAY';
const AMQP_QUEUE_NAME = 'SUBSCRIPTION_SERVICE_QUEUE';

module.exports = {
  apps: [{
    name: 'plans-service',
    script: './src/plans-service/src/index.js',
    watch: true,
    env: {
      NODE_ENV: 'development',
      MYSQL_USER: 'root',
      MYSQL_PASS: '123456789',
      MYSQL_HOST: 'localhost',
      MYSQL_PORT: 3007,
      MYSQL_DB: 'PlansDb',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'subscriptions-service',
    script: './src/subscriptions-service/src/index.js',
    watch: true,
    env: {
      NODE_ENV: 'development',
      MYSQL_USER: 'root',
      MYSQL_PASS: '123456789',
      MYSQL_HOST: 'localhost',
      MYSQL_PORT: 3008,
      MYSQL_DB: 'SubscriptionsDb',
      PORT: 3002,
      AMQP_CONNECTION_URL,
      AMQP_CHANNEL_NAME,
      AMQP_QUEUE_NAME
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'payments-service',
    script: './src/payments-service/index.js',
    watch: true,
    env: {
      AMQP_CONNECTION_URL,
      AMQP_CHANNEL_NAME,
      AMQP_QUEUE_NAME
    },
    env_production: {
    }
  }]
}
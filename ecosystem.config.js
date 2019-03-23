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
      PORT: 3002
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
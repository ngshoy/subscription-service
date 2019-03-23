const PaymentsService = require('./PaymentsService');

const CONNECTION_URL = process.env.AMQP_CONNECTION_URL;
const CHANNEL_NAME = process.env.AMQP_CHANNEL_NAME;
const QUEUE_NAME = process.env.AMQP_QUEUE_NAME;

const service = new PaymentsService(CONNECTION_URL, CHANNEL_NAME, QUEUE_NAME);
service.init();

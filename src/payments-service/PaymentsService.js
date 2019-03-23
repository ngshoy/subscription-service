const amqplib = require('amqplib');

module.exports = class PaymentsService {
  constructor(connectionUrl, channelName, queueName) {
    this.connectionUrl = connectionUrl;
    this.channelName = channelName;
    this.queueName = queueName;
    this.connection = null;
    this.channel = null;
  }

  async init() {
    console.log(`Initializing RabbitMQ connection to ${this.connectionUrl}`);
    this.connection = await amqplib.connect(this.connectionUrl);
    this.channel = await this.connection.createChannel(this.channelName);
    await this.channel.assertQueue(this.queueName);
    await this.channel.consume(this.queueName, this.onMessageReceived.bind(this));
  }

  onMessageReceived(message) {
    const contents = message.content.toString();
    const parsed = JSON.parse(contents);

    if (parsed.subscription && parsed.plan) {
      const {subscription, plan} = parsed;
      console.log(`Charging card ${subscription.cardNumber} with ${plan.price}`);
      this.channel.ack(message);
    } else {
      console.log('Invalid payload. Aborting...');
    }
  }
}
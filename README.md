#INITIALIZE DBS
- CREATE SCHEMA PlansDb CHARACTER SET "utf8mb4"
- CREATE SCHEMA SubscriptionsDb CHARACTER SET "utf8mb4"

#TO POPULATE TABLES
- cd src
- sequelize model:generate --name Plan --attributes name:string,price:float,type:string,userId:integer
- sequelize model:generate --name Subscription --attributes ...
- sequelize db:migrate

#TO REVERT MIGRATION
- sequelize db:migrate:undo:all (it will call down methods)

#TO START RABBITMQ
- register at cloudamqp.com
- create a queue after registration
- copy the amqp url to ecosystem config

#ABOUT API GATEWAY
- API GATEWAY will reroute your requests to /api/plans and /api/subscriptions to their relative ports
- It is exposed at http://localhost:8080/
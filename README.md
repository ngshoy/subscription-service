#INITIALIZE DBS
- CREATE SCHEMA PlansDb CHARACTER SET "utf8mb4"
- CREATE SCHEMA SubscriptionsDb CHARACTER SET "utf8mb4"

#TO POPULATE TABLES
- cd src
- sequelize db:migrate

#TO REVERT MIGRATION
- sequelize db:migrate:undo:all (it will call down methods)
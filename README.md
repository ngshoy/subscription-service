#TO POPULATE TABLES
- cd src
- sequelize db:migrate

#TO REVERT MIGRATION
- sequelize db:migrate:undo:all (it will call down methods)
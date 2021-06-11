#!/usr/bin/env sh

cat >ormconfig.json <<EOL
{
  "type": "mysql",
  "host": "$MYSQL_HOST",
  "port": "$MYSQL_PORT",
  "username": "$MYSQL_USER",
  "password": "$MYSQL_PASS",
  "database": "$MYSQL_NAME",
  "maxQueryExecutionTime": 10000,
  "synchronize": false,
  "logging": [
    "error"
  ],
  "entities": [
    "dist/entity/*.js"
  ],
  "migrationsTableName": "migrations",
  "cli": {
    "migrationsDir": "dist/migration"
  },
  "migrations": [
    "dist/migration/*.js"
  ]
}
EOL


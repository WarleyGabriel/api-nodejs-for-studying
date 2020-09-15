const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/postgres");
const Postgres = require("./db/strategies/mongodb");

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();

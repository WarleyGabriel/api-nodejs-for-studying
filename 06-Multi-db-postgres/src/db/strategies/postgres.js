const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item cadastrado no Postgres");
  }
}

module.exports = Postgres;

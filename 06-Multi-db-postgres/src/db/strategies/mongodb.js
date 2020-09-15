const ICrud = require("./interfaces/interfaceCrud");

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item cadastrado no MongoDB");
  }
}

module.exports = MongoDB;

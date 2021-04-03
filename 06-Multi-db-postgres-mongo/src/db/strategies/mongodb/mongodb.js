const ICrud = require("../interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectado",
};

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  async isConnected() {
    const state = this._connection.readyState;
    if (state === STATUS[1] || state !== STATUS[2]) return state;

    await new Promise((resolse) =>
      setTimeout(() => {
        resolse;
      }, 1000)
    );

    return state;
  }

  static connect() {
    Mongoose.connect("mongodb://warley:123456@localhost:27017/heroes", {
      useNewUrlParser: true,
      function(error) {
        if (!error) return;
        console.log("Falha na conexão!", error);
      },
    });

    const connection = Mongoose.connection;

    connection.once("open", () => console.log("data base rodando!"));

    return connection;
  }

  async create(item) {
    return await this._schema.create(item);
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit);
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;

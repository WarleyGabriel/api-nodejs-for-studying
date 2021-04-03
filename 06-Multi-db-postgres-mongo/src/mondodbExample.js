const Mongoose = require("mongoose");

Mongoose.connect("mongodb://warley:123456@localhost:27017/heroes", {
  useNewUrlParser: true,
  function(error) {
    if (!error) return;
    console.log("Falha na conexão!", error);
  },
});

const connection = Mongoose.connection;

connection.once("open", () => console.log("data base rodando!"));

// setTimeout(() => {
//   const state = connection.readyState;
//   console.log("🚀 ~ file: mondodbExample.js ~ line 16 ~ state", state);
// }, 1000);

const heroiSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  poder: {
    type: String,
    required: true,
  },
  inseredAt: {
    type: Date,
    default: new Date(),
  },
});

const model = Mongoose.model("heroes", heroiSchema);

async function main() {
  const result = await model.create({
    nome: "blabla",
    poder: "kakaka",
  });
  console.log(
    "🚀 ~ file: mondodbExample.js ~ line 42 ~ main ~ result ",
    result
  );

  const listItens = await model.find();
  console.log(
    "🚀 ~ file: mondodbExample.js ~ line 48 ~ main ~ listItens",
    listItens
  );
}

main();

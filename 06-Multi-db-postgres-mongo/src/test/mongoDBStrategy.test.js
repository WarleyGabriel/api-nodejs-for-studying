const assert = require("assert");
const MongoDB = require("../db/strategies/mongodb/mongodb");
const Context = require("../db/strategies/base/contextStrategy");
const { connect } = require("http2");
const HeroiSchema = require("../db/strategies/mongodb/schemas/heroisSchema");
const { schema } = require("../db/strategies/mongodb/schemas/heroisSchema");

let context = undefined;

const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "flexas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Patonlino", poder: "velocidade" };
let MOCK_HEROI_ID = undefined;

describe("MongoDB Strategy", function () {
  this.beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, HeroiSchema));

    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ID = result._id;
  });

  it("cadastrar", async function () {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);

    assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it("listar", async () => {
    const [{ nome, poder }] = await context.read({
      nome: MOCK_HEROI_CADASTRAR.nome,
    });

    assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it("Atualizar", async () => {
    const result = await context.update(MOCK_HEROI_ID, { nome: "LALALA" });
    assert.deepStrictEqual(result.nModified, 1);
  });

  it("Remover", async () => {
    const result = await context.delete(MOCK_HEROI_ID);
    assert.deepStrictEqual(result.n, 1);
  });
});

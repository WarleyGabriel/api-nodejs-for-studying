const assert = require("assert");
const Postgres = require("../db/strategies/postgres/postgres");
const Context = require("../db/strategies/base/contextStrategy");
const HeroiSchema = require("../db/strategies/postgres/schemas/heroisSchema");

const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "flexas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Batman", poder: "dinheiro" };

let context = undefined;

describe("Postgres Strategy", function () {
  this.timeout(Infinity);

  this.beforeAll(async function () {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroiSchema);
    context = new Context(new Postgres(connection, model));

    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it("cadastrar", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);

    delete result.id;

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("listar", async () => {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Atualizar", async () => {
    const [result] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      poder: "novo poder atualizado",
    };

    const [updated] = await context.update(result.id, novoItem);
    assert.deepEqual(updated, 1);

    const [itemAtualizado] = await context.read({ id: result.id });
    assert.deepEqual(itemAtualizado.poder, novoItem.poder);
  });

  it("Remover", async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});

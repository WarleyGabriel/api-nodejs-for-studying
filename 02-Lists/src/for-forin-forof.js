const service = require("./service");

async function main() {
  try {
    const result = await service.obterPessoas("a");

    const names = [];

    console.time("for");
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("for");

    console.time("for-in");
    for (let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("for-in");

    console.time("for-off");
    for (pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.timeEnd("for-off");

    console.log(names);
  } catch (error) {
    console.error("erro interno", error);
  }
}

main();

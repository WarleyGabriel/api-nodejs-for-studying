const { requiredOption } = require("commander");

const commander = require("commander");
const database = require("./database");
const Heroi = require("./heroi");

async function main() {
  commander
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "ID do Heroi")

    .option("-c, --cadastrar", "Poder do Heroi")
    .option("-l, --listar", "Listar o Heroi")
    .option("-r, --remover", "Remove um Heroi pelo id")
    .option("-a, --atualizar [value]", "Atualiza um Heroi pelo id")
    .parse(process.argv);

  const heroi = new Heroi(commander);

  try {
    if (commander.cadastrar) {
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);
      if (!resultado) {
        console.error("Heroi não pode ser cadastrado!");
        return;
      }
      console.log("Heroi cadastrado com sucesso :D");
    }

    if (commander.listar) {
      const resultado = await database.listar();
      console.log(resultado);
      return;
    }

    if (commander.remover) {
      const resultado = await database.remover(heroi.id);
      if (!resultado) {
        console.error("Heroi não pode ser removido!");
        return;
      }
      console.log("Heroi removido com sucesso :D");
    }

    if (commander.atualizar) {
      const idParaAtualizar = parseInt(commander.atualizar);
      delete heroi.id;

      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);

      const resultado = await database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );

      if (!resultado) {
        console.error("não foi possivel atualizar o heroi");
        return;
      } else {
        console.log("heroi atualizado com sucesso!");
      }
    }
  } catch (error) {
    console.error("deu ruim", error);
  }
}

main();

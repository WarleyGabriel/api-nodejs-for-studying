const service = require("./service");

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice < this.length; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }
  return novoArrayMapeado;
};

async function main() {
  try {
    const result = await service.obterPessoas("a");

    // const names = [];
    // result.results.forEach(item => {
    //     names.push(item.name)
    // });

    // const names = result.results.map((item) => {
    //   return item.name;
    // });

    // const names = result.results.map((pessoa) => pessoa.name);

    const names = result.results.meuMap(function (pessoa, indice) {
      return `[${indice}] ${pessoa.name}`;
    });
    console.log(names);
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();

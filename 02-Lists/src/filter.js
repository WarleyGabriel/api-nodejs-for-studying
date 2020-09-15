const { obterPessoas } = require("../service");

Array.prototype.meuFilter = function (callback) {
  const lista = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item);
    if (!result) continue;
    lista.push(item);
  }
  return lista;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");

    familiaLars = results.meuFilter((item) => {
      return item.name.toLowerCase().indexOf("lars") !== -1;
    });
    const names = familiaLars.map((pessoa) => pessoa.name);
    console.log(names);
  } catch (error) {
    console.error("deu ruim", error);
  }
}

main();

// familiaLars = results.filter((item) => {
//   const result = item.name.toLowerCase().indexOf("lars") !== -1;
//   return result;
// });
// const names = familiaLars.map((pessoa) => pessoa.name);
// console.log(names);

/*
0 Obter um usuário
1 Obter o número de telefone de um usuário a partir do seu ID
2 Obter o endereço do usuário pelo ID
*/
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error("deu ruim de verdade"));
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({ numero: "1111212", ddd: 12 });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, { rua: "bla bla", numero: 120 });
  }, 2000);
}

main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
          Nome: ${usuario.nome}
          Endereço: (${telefone.ddd}) ${telefone.numero}
          Telefone: ${endereco.rua}, ${endereco.numero}`);

    console.timeEnd("medida-promise");
  } catch (e) {
    console.error("DEU RUIM", e);
  }
}

// const usuarioPromise = obterUsuario();

// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: usuario,
//         telefone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereço: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
//       Telefone: ${resultado.endereco.rua}, ${resultado.endereco.numero}`);
//   })
//   .catch(function (error) {
//     console.log("DEU RUIM", error);
//   });

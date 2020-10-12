// Executando comandos dentro do Mongo DB
/**
docker exec -it mongodb \
    mongo -u warley -p 123456 --authenticationDatabase heroes
 */

// Listando todas as bases de dados
/**
show dbs
*/

// Acessando a base de dados heroes
/**
use heroes
*/

// Listando tabelas da base de dados
/**
show collections
*/

// Inserindo um registro
db.heroes.insert({
  nome: "Flash",
  poder: "Velocidade",
  dataNascimento: "1990-01-01",
});

// Consultando
db.heroes.find();
db.heroes.find().pretty();

// Rodando JS code no terminal do mongo
for (let i = 0; i < 50; i++) {
  db.heroes.insert({
    nome: `Clone-${i}`,
    poder: "lalala",
    nascimento: "1900-01-01",
  });
}

// Consultando...
db.heroes.count();
db.heroes.findOne();
db.heroes.find().limit(100).sort({ nome: -1 });
db.heroes.find({}, { poder: 1, _id: 0 });

// Atualizando...
// Modificando totalmente o objeto
db.heroes.update(
  { _id: ObjectId("5f8499a336d2198c91c2a050") },
  { nome: "mulher maravilha" }
);

// Modificando somente o que nome
db.heroes.update(
  { _id: ObjectId("5f849b4136d2198c91c2a076") },
  { $set: { nome: "lanterna verde" } }
);

// Deletando...
db.heroes.remove({ nome: "lanterna verde" });

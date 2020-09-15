# Docker

## Run postgres

```bash
docker run \
    --name postgres \
    -e POSTGRES_USER=warley \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
```

## SQL Manager

```bash
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```

## Mongo DB

```bash
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=123456 \
    -d \
    mongo:4
```

## Mongo client

```bash
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
```

### Criar database e usuário

```bash
docker exec -it mongodb \
    mongo --host localhost -u admin -p 123456 --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'warley', pwd: '123456', roles: [{role: 'readWrite', db: 'heroes'}]})"
```

-- Deletando tabela
DROP TABLE IF EXISTS TB_HEROIS;

-- Criando tabela
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
);

-- Criando herois
INSERT INTO
    TB_HEROIS (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Nadar um tantão'),
    ('Batman', 'Dinheiro');

-- Consultando dados
SELECT
    *
FROM
    TB_HEROIS;

SELECT
    *
FROM
    TB_HEROIS
WHERE
    NOME = 'Flash';

-- Atualizando dados
UPDATE
    TB_HEROIS
SET
    NOME = 'Goku',
    PODER = 'Deus'
WHERE
    ID = 1;

-- Removendo dados
DELETE FROM
    TB_HEROIS
WHERE
    ID = 2

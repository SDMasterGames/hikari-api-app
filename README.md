# Api para o Aplicativo da Hikari Scan.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

O código atual foi refatorado do zero.

#### Mudanças feitas:

- Testes unitários e de integração.
- Melhor tratamento dos erros.
- Mudança de banco de dados. (de MongoDB para PostegreSQL).
- Organização das pastas.
- Adicionado Cache para reduzir o tempo das respostas.
- Removida a dependências do Express nos controllers.
- Separando as rotas para o consumo em versões.

#### O que foi usado?

- Express
- Typescript
- Prisma
  - PostegreSQL
- IoRedis
  - Redis
- Jest
  - @SWC
- SuperTest
- Docker
  - Docker-Compose
- Axios
- Cheerio
- Cors
- Dotenv
- JWT
  - JsonWebToken

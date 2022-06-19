# Api para o Aplicativo da Hikari Scan.
O código atual foi refatorado do zero.

O Aplicativo da [Hikari Scan](https://play.google.com/store/apps/details?id=com.sd.hikariapp)

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




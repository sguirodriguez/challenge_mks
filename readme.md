## Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Yarn](https://yarnpkg.com/) instalados em sua máquina.

## Instalação

1. Verifique o env.example e crie um chamado env para adicionar as variáveis de ambiente (variáveis no email):

```bash
    DB_DATABASE=""
    DB_USERNAME=""
    DB_PASSWORD=""
    DB_DIALECT=""
    DB_HOST=""
    DB_PORT=""
    NODE_ENV=""
    DB_TIMEZONE=""
```

2. Instale as dependências utilizando o Yarn:

```bash
 yarn
```

3. Execute o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
 yarn dev
```

## Tecnologias

- [Node.js](https://nodejs.org/en)
- [Sequelize](https://sequelize.org/)

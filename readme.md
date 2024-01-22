<h1 align="center">Entrevista</h1>

## Versões das ferramentas

- **Node 20.11.0**  
- **PostgreSQL 16** 

## Decisões 

- Como optei por usar latitude e longitude, a distância é calculada pelo método haversine (distância entre dois pontos em um globo), não pelo método de distância euclidiana.

- Acredito que a paginação, com poucos clientes, seria melhor no lado do cliente. No entanto, optei pela paginação no lado do servidor para mostrar mais da minha capacidade.

- No backend, apliquei teste somente nas classes de serviço e nos helpers, por conterem maior parte da lógica.


## :clipboard: Como usar?

```
# Clonar esse repositório
$ git clone https://github.com/saymow/travelling-salesman-interview.git

# Mudar para o diretório do projeto
$ cd travelling-salesman-interview

# Mudar para o diretório backend.
$ cd backend

# Instalar dependêncies
$ npm install

# Create a .env file in the same format as the template.e.
$ npm start

# Copiar o arquivo ".template.env" para um arquivo .env
$ cp ./.template.env .env

# Preencher o .env com dados do banco - MANTER A PORTA DA APLICAÇÃO (3333)

# (Opcional) Rodar script de seed do banco de dados
$ npm run seed

# (Opcional) Rodar testes nas classes de serviço e helpers
$ npm run test

# Rodar o backend em modo dev
$ npm run dev

# Acessar o diretório frontend
$ cd ../frontend

# Instalar dependêncies
$ npm install

# Rodar o frontend em modo dev 
$ npm run dev

# (Opcional) Rodar testes e2e
$ npm run cypress:run
```

## Extras 

Se você estiver no linux, talvez tenha problemas ao rodar os testes e2e do cypress. Tem um guia <a href="https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites" target="_blank">aqui</a>.
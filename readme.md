<h1 align="center">Entrevista</h1>

## Versões das ferramentas

- **Node 20.11.0**  
- **PostgreSQL 16** 

## Decisões 

- Como optei por usar latitude e longitude, a distância é calculada pelo método haversine (distância entre dois pontos em um globo), não pelo método de distância euclidiana.

- Acredito que mapas podem ajudar na visualização, então adicionei mapas.

- Acredito que a paginação, com poucos clientes, seria melhor no lado do cliente. No entanto, optei pela paginação no lado do servidor para mostrar mais da minha capacidade.


## :clipboard: Como usar?

```
# Clonar esse repositório
$ git clone git@github.com:saymow/saymow/travelling-salesman-interview

# Mudar para o diretório do projeto
$ cd travelling-salesman-interview

# Mudar para o diretório backend.

$ cd backend

# Baixar node_modules
$ npm install

# Create a .env file in the same format as the template.e.
$ npm start

# Copiar o arquivo ".template.env" para um arquivo .env
$ cp ./.template.env .env

# Preencher o .env com dados do banco (manter a porta)

# (Opcional) Rodar script de seed do banco de dados
$ npm run seed

# (Opcional) Rodar testes nas classes de serviço e helpers
$ npm run test

# Rodar o backend em modo dev
$ npm run dev

# Acessar o diretório frontend
$ cd ../frontend

# Baixar node_modules
$ npm install

# Rodar o frontend em modo dev 
$ npm run dev
```

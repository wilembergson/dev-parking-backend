# Parking - controle de estacionamento (backend)

## Descrição

Este é um sistema para gerenciar o fluxo de entrada e saída de veículos em um estacionamento, fornecer dados sobre o cliente, quanto tempo um veículo passou estacionado no local, quanto ele deverá pagar por hora, e qual funcionário o atendeu.
</br>

## Instruções
- Antes tudo, certifique-se de que o Docker esteja instalado e rodando em sua máquina.
- Abra um terminal na pasta raíz e execute o comando abaixo para instalar as dependencias.

```bash
$ npm install
```
- Ainda na pasta raíz, crie um arquivo ```.env``` e preencha e acordo com o arquivo ```.env-exemple``` que também se encontra na raíz
</br>

## Executando a aplicação

```bash
# Subir os containers docker
$ npm run up

# Derrubar os containers docker
$ npm run down
```
Ao subir a aplicação, será criado um container com dois serviços, um com o banco de dados Postgres e o outro com a aplicação NestJS.
</br>

## Tecnologias
- NestJS
- Prisma (ORM)
- Postgres
- Docker
</br>

## Repositório do Frontend
- https://github.com/wilembergson/dev-parking-frontend
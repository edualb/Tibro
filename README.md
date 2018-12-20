[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/edualb/Tibro/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/edualb/Tibro.svg?branch=master)](https://travis-ci.org/edualb/Tibro)
# Tibro
Tibro é um robô que irá ajudar jogadores de Ragnarok online que utiliza discord a encontrar descrições/características de monstros, itens e consumíveis dentro do jogo. Inicialmente o robô só trará as características de monstros. dependendo do apoio da comunidade, poderá se tornar um projeto maior , trazendo as características de itens também.

## Comece Aqui
* Baixe e instale o [NodeJs](https://nodejs.org/)

* Clone o repositório:

```shell
$ git clone git@github.com:edualb/Tibro.git
```

* Entre na pasta do projeto:

```shell
$ cd Tibro
```

* Instale dependencias: 

```shell
$ npm install --save
```

* Rodar os testes:

```shell
$ npm test
```

## Bot Discord
* Crie um servidor no [Discord](https://discordapp.com/)

* Crie um app na [área do desenvolvedor](https://discordapp.com/developers/applications/) e crie sua aplicação

* Autentique o seu bot no servidor https://discordapp.com/oauth2/authorize?client_id=**YOUR_CLIENT_ID**&scope=bot

* Crie um arquivo tibroconfig.json dentro da pasta bot

```shell
{
    "token": YOUR_BOT_TOKEN,
    "prefix": "!"
}
```

* Execute o bot:
```shell
$ node bot/tibro.js
```

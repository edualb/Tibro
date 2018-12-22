[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/edualb/Tibro/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/edualb/Tibro.svg?branch=master)](https://travis-ci.org/edualb/Tibro)

# Tibro EN
Tibro is a robot that will help players of Ragnarok online who uses discord to find descriptions / characteristics of monsters, items and consumables within the game. Initially the robot will only bring the characteristics of monsters. depending on community support, could become a larger project, bringing the features of items as well.


# Tibro PT-BR
Tibro é um robô que irá ajudar jogadores de Ragnarok online que utiliza discord a encontrar descrições/características de monstros, itens e consumíveis dentro do jogo. Inicialmente o robô só trará as características de monstros. dependendo do apoio da comunidade, poderá se tornar um projeto maior , trazendo as características de itens também.

## Start here
* Download and install [NodeJs](https://nodejs.org/)

* Clone the repository:

```shell
$ git clone git@github.com:edualb/Tibro.git
```

* Enter the project folder:

```shell
$ cd Tibro
```

* Install dependencies: 

```shell
$ npm install --save
```

* Run the tests:

```shell
$ npm test
```

## Bot Discord
* Create a server at [Discord](https://discordapp.com/)

* Create an app on [desenveloper area](https://discordapp.com/developers/applications/) and create your app

* Authenticate your bot on the server https://discordapp.com/oauth2/authorize?client_id=**YOUR_CLIENT_ID**&scope=bot

* Create a environment variable `TOKEN` that will receive Discord's token: 

* Execute the bot:
```shell
$ node bot/tibro.js
```

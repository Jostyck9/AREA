# Area - Epitech Project - 2020

The goal of this project is to discover Kotlin and Node.JS (REACT) through the creation of a business application. To do this,we have implemented a software suite that functions similar to that of [IFTT](https://ifttt.com) and/or  [Zapier]( [IFTT](https://ifttt.com)). This software suite will be broken into three parts : 
- An application server to implement all the features listed below (see Features) 
- A web client to use the application from your browser by querying the application server 
- A mobile client to use the application from your phone by querying the application server

Thoses parts have to be shelter on docker and more precisely with docker-compose that use containers.

# Installation, configuration and how to launch the project

## Installation

To install our project, you just have too clone our Github repository from here: [AREA](https://github.com/Jostyck9/AREA)
```sh
$ git clone https://github.com/Jostyck9/AREA.git
$ cd AREA/
```

## Configuration

Like we said, we actually use docker, it's kind of easy to launch the project. But before, there is things we must talk. Our project use ngrok. Your must launch it before launching our project.
How to launch ngrok:
```sh
$ cd ./AreaApi/
$ ./ngrok http 8080
```
This command create a communication tunnel between API's and our application.
API's ? Oh yeah, you have also things to do with that before starting the project. You have to modificate Two Files. Two .env file. One is in AreaWeb part, the other one is in the AreaApi part.
First we'll edit the AreaApi .env. Never close the terminal which is hosting ngrok !!
Open an other one, go inside our project folder. When you edit the .env file, don't edit the line above ``` ServrUrl``` line. For the SERVER_URL. Edit ```ID``` with the link with your ngrok link.
You've see that below, you have a lots of items to provide. To have thoses items. Just sign up with thoses links and inquire the information in the .env


```sh
$ cd ./AreaApi/
$ nano .env
```
For Twitter, click [here](https://developer.twitter.com/en/apps)
For Spotify, click [here](https://developer.spotify.com/dashboard/login)
For Github, click [here](https://github.com/settings/developers)
For Discord, click [here](https://discordapp.com/developers/applications)
For Dropbox, click [here](https://www.dropbox.com/developers/apps/ )
```sh
SERVER_URL=https://ID.ngrok.io

TWITTER_ENV=
TWITTER_KEY=
TWITTER_SECRET=

GITHUB_KEY=
GITHUB_SECRET=

DISCORD_TOKEN=
DISCORD_APP_TOKEN=
DISCORD_BOT_URL=

SPOTIFY_KEY=
SPOTIFY_SECRET=

DROPBOX_KEY=
DROPBOX_SECRET=
```
Now let's go in our AreaWeb folder.
```sh
$ cd ./AreaWeb/
$ nano .env
```
You hjust have to to two things.
```sh
REACT_APP_SERVER_AUTH=https://ID.ngrok.io
REACT_APP_SERVER_URI=http://your.beautiful.internet.protocol:8080 (192.168.1.1 like)
REACT_APP_URI=http://your.beautiful.internet.protocol:8081 (192.168.1.1 like)
```

## How to launch the project
Finally ! The configuration. You'll finally launch our project. To launch it, go to the root folder of our project and simply to this command
```sh
$ docker-compose build && docker-compose up
OR
$ docker-compose up --build
```

# Usage

Like we said previsously, there is three parts in our project. You have to links. To acces to our API, open your browser and put this URL
- [http://localhost:8080](http://localhost:8080)

But you'll see nothing. You just can access to our swagger documentation and test our project with request. To acces to swagger, got to this URL:
- [http://localhost:8080/api-docs/](http://localhost:8080/api-docs/ )

If you want to test our project with the web version just put this link in your browser:
- [http://localhost:8081/](http://localhost:8081/ )

You'll have to register. After this manipulation. Don't forget to link your github, Twitter and others services we offer.
Go to the home page, and enjoy the creation of yours AREA's !
You want to do it and your smartphone ? Go here and download our free apk. **Soon available on the Play Store**
- [http://localhost:8081/client.apk](http://localhost:8081/client.apk )



# Our services with actions and reaction

|     Services   |			Actions				 |			Reactions		   |
|----------------|-------------------------------|-----------------------------|
|Discord		|`Messaged received` `A user joined` `A user is banned` |`Send message` `Create channel`            |
|Twitter		|`Tweet`            |`Tweet`            |
|Github			|`Push`  `Pull request` |`X`|
|Spotify		|`Music added`|`Add music` `Play Music` `Pause music`|
|Mail			|`X`|`Send mail`|
|Timer			|`To to interval`|`X`|
|Dropbox		|`File is added` `File deleted`|`X`|
|Twitch			|`X` | `Stream started`



# Documentation

You can acces to different documentation. 
First one is the Swagger documentation on this URL: 
- [http://localhost:8080/api-docs/](http://localhost:8080/api-docs/ )

In our repository, there is a pdf which explain each part of our project (Documentation.pdf)

You can also generate documentation from code. You just have to do this (Requirements -> yarn) :
```sh
$ cd ./AreaWeb/
$ yarn docs:build
$ firefox docs/index.html
```
```sh
$ cd ./AreaApi/
$ yarn docs:build
$ firefox docs/index.html
```


Licence
----
Hugo Berthome, Romane Bézier, Esther Bailloux, Clément Dumaine, Fabien Brosset and Gabin Warnier-de-Wailly
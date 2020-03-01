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
```sh
* Visit [Twitter](https://developer.twitter.com/en/apps)
* Sign in with your twitter account
* Click on 'Create an app'
    * Fill your Application details
    * Enable Sign in with Twitter
    * Add Callback URL = https://your-url-ngrok.io/auth/twitter/callback
* Click on 'Keys and tokens'
    * Click on 'Generate' access token and access secrete token
    * Add your access token, access secret token, API key and API secret key inside the .env file
* Click on 'Permissions'
    * Click on 'Edit'
    * Add 'Read, write, and Direct Messages' permissions
* Click on 'Dev environments'
    * Click on 'Set up dev environment' for 'Account Activity API' section
    * Select a name for your environment
    * Select your app
    * Add your environment name selected in the .env
```

For Spotify, click [here](https://developer.spotify.com/dashboard/login)
```sh
Spotify:
- Aller sur la platforme developper : https://developer.spotify.com/dashboard/login
- Connectez-vous
- Créer une application et remplissez les champs demandés (rien de special)
- Vous êtes apres redirigé sur la page de l'application
- Vous pouvez y voir le client-id et le client-secret mais caché (vous pouvez le montrer qd vs voulez), ce sont les CLES à mettre dans le .env de /AreaApi
- Faites "Edit settings"
- Mettez en url callback l'url en "https://...ngrok.io/auth/spotify/callback" de ngrok qu'il a généré
```

For Github, click [here](https://github.com/settings/developers)
```sh
* Visit [Github] (https://github.com/settings/developers)
* Sign in with your github account
* Create an 'OAuth AP'
    * Fill the required fields (Application name, Homepage URL)
    * Add Callback URL = https://your-url-ngrok.io/auth/github/callback
* Add your access tokens in your .env file
    * Client ID as GITHUB_KEY
    * Client secret as GITHUB_SECRET
```

For Discord, click [here](https://discordapp.com/developers/applications):
```sh
* Sign in with your Discord account
* Click on 'New Application'
* Register your app by giving it a name
* Click on 'Bot' on the left side panel then on 'Add Bot'
* Add your bot token in your .env file as DISCORD_TOKEN /!\ Be careful not to click on 'Reveal Token' or to push it on Github or it will make your bot token deprecated /!\
* Click on 'OAuth2' on the left side panel
    * Check 'bot' on the 'scopes' panel
* Then on 'bot permissions' check the following 
    * View Audit Log
    * View Server Insights
    * Manage Channels
    * View Channels
    * Send Messages
    * Read Message History
* Add the url that appeared on the 'scopes' panel in your .env file as DISCORD_BOT_URL (ex: https://discordapp.com/api/oauth2/authorize?client_id=0000000000&permissions=00000&scope=bot)
```

For Dropbox, click [here](https://www.dropbox.com/developers/apps/ )
```sh
* Visit [Dropbox](https://www.dropbox.com/developers)
* Click on 'Create apps'
* Sign in with your Dropbox account
* Create a new app
    * Select 'Dropbox API'
    * Select 'Full Dropbox'
    * Select a name for your app
    * Click on 'Create app'
* Set up your app
    * Add Redirect URI's = https://your-url-ngrok.io/auth/dropbox/callback
    * Generated access token
    * Click on 'Enable additional users'
    * Click on 'Apply for production'
    * Add 'App key' and 'App secret' inside the .env file
    * Add Webhook URI's = https://your-url-ngrok.io/dropbox/webhook
        * the server API and ngrok must be launch for this action (do this action at the end)
```
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

# API Routes

## About

### GET - /about.json
#### Description
Get the about.json file with all the informations about the services
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with the API informations as the services availables and the their actions / reactions
 - When performing an action that is restricted, `400` will be returned together with a json containing a message field.

## Area

### `GET` - /area
#### Description
Send a list of the user's Areas
#### Header fields
|HEADER FIELD| VALUE |
|--          |--     |
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with an array of all the area created by the user
 - When performing an action that is restricted, `404` or `401` will be returned together with a json containing a message field.

### `POST`- /area
#### Description
Create an area between an action and a reaction
#### Header fields
|HEADER FIELD| VALUE |
|--          |--     |
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Body fields
| BODY FIELD          | VALUE |
|--                   |--     |
| action_id           | ***Required*** The id of the action to trigger |
| reaction_id         | ***Required*** The id of the reaction to perform |
| action_parameters   | ***Required*** The json with the action's parameters |
| reaction_parameters | ***Required*** The json with the reaction's parameters |
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with a message
 - When performing an action that is restricted, `404` or `401` will be returned together with a json containing a message field.
 
### `GET` - /area/{id}
#### Description
Get informations for a specific area
#### Header fields
|HEADER FIELD| VALUE |
|--          |--     |
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Path fields
|Path FIELD| VALUE |
|--        |--     |
| id       | ***Required*** id of the area |
#### Response format
 - A completed request will return a `200` response code, and inside the body a json containingthe area created by the user
 - When performing an action that is restricted, `404` or `401` or `403` will be returned together with a json containing a message field.
 
### `DELETE` - /area/{id}
#### Description
Delete a specific area
#### Header fields
|HEADER FIELD| VALUE |
|--          |--     |
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Path fields
|Path FIELD| VALUE |
|--        |--     |
| id       | ***Required*** id of the area |
#### Response format
 - A completed request will return a `200` response code, and inside the body a json with a message field
 - When performing an action that is restricted, `404` or `401` or `403` will be returned together with a json containing a message field.
 
## AUTH

### `POST`- /auth/register
#### Description
Register the user inside our service
#### Body fields
| BODY FIELD | VALUE |
|--|--|
| name | ***Required*** The name of the user |
| email | ***Required*** The email of the email |
| password | ***Required*** The password of the user |
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with a token field and the token to use
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.

### `POST`- /auth/login
#### Description
Login the user inside our service
#### Body fields
| BODY FIELD | VALUE |
|--|--|
| email | ***Required*** The email of the email |
| password | ***Required*** The password of the user |
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with a token field and the token to use
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.

### `GET`- /auth/github
#### Description
Login the user with github or associate his account with github 
(If no token given, create or log the user)
#### Query fields
| QUERY FIELD | VALUE |
|--|--|
| cb | ***Required*** The callback to redirect the user after loging |
| token | ***Optional*** The token of the user |
#### Response format
 - A completed request will redirect the user, and after completing connection, he will be redirect to the url given in `cb` with in query the `status` that can be `OK` || `KO` and if he is connecting, a `token` field with our api token
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.
 
### `GET`- /auth/dropbox
#### Description
Associate account with dropbox
#### Query fields
| QUERY FIELD | VALUE |
|--|--|
| cb | ***Required*** The callback to redirect the user after loging |
| token | ***Required*** The token of the user |
#### Response format
 - A completed request will redirect the user, and after completing connection, he will be redirect to the url given in `cb` with in query the `status` that can be `OK` || `KO` and  a `token` field with our api token
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.
 
### `GET`- /auth/spotify
#### Description
Associate account with spotify
#### Query fields
| QUERY FIELD | VALUE |
|--|--|
| cb | ***Required*** The callback to redirect the user after loging |
| token | ***Required*** The token of the user |
#### Response format
 - A completed request will redirect the user, and after completing connection, he will be redirect to the url given in `cb` with in query the `status` that can be `OK` || `KO` and  a `token` field with our api token
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.

### `GET`- (NGROK url base)/auth/twitter
#### Description
Associate account with twitter, needs to use the ngrok base url in `https`
#### Query fields
| QUERY FIELD | VALUE |
|--|--|
| cb | ***Required*** The callback to redirect the user after loging |
| token | ***Required*** The token of the user |
#### Response format
 - A completed request will redirect the user, and after completing connection, he will be redirect to the url given in `cb` with in query the `status` that can be `OK` || `KO` and  a `token` field with our api token
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field. 

### `GET`- /auth/discord
#### Description
Associate account with discord
#### Query fields
| QUERY FIELD | VALUE |
|--|--|
| token | ***Required*** The token of the user |
#### Response format
 - A completed request will redirect the user to the discord auth
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.

### `POST`- /auth/logout
#### Description
Log out the user out of our service api
#### Header fields
|HEADER FIELD| VALUE |
|--|--|
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with a message field 
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.

### `POST`- /auth/logoutAll
#### Description
Log out the user out of our service api from all his device
#### Header fields
|HEADER FIELD| VALUE |
|--|--|
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Response format
 - A completed request will return a `200` response code, and inside the body a Json with a message field 
 - When performing an action that is restricted, `404` or `401`  will be returned together with a json containing a message field.

### ``GET``- /me  
#### Description
Get the auth user informations
#### Header fields 
|HEADER FIELD| VALUE | 
|--|--| 
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json with a message
- When performing an action that is restricted, `403` will be returned together with a json containing a message field.

### ``PATCH``- /me/password
#### Description
Update password
#### Header fields 
|HEADER FIELD| VALUE | 
|--|--| 
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| password | ***Required*** The password to be changed by the user |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json with a message
- When performing an action that is restricted, `403` will be returned together with a json containing a message field.

### ``PATCH``- /me/username
#### Description
Update username
#### Header fields 
|HEADER FIELD| VALUE | 
|--|--| 
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| username | ***Required*** The username to be changed by the user |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json with a message
- When performing an action that is restricted, `403` will be returned together with a json containing a message field.

### ``GET``- /me/username
#### Description
Get name
#### Header fields 
|HEADER FIELD| VALUE | 
|--|--| 
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json with a message
- When performing an action that is restricted, `403` will be returned together with a json containing a message field.
### ``GET``- /me/auth
#### Description
Get all the services auth and their status
#### Header fields 
|HEADER FIELD| VALUE | 
|--|--| 
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with a name and boolean to know if the user is connected
- When performing an action that is restricted, `403` will be returned together with a json containing a message field.

### ``GET``- /me/auth/{nameService}
#### Description
Get all the services auth and their status
#### Header fields 
|HEADER FIELD| VALUE | 
|--|--| 
| Authorization | ***Required*** A valid access token from the Area Auth service |
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| nameService| ***Required*** The nameService use to get all the services auth |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with a name and boolean to know if the user is connected
- When performing an action that is restricted, `403` will be returned together with a json containing a message field.

### ``GET``- /services
#### Description
Send a list of available services
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with a list of all available services
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.
### ``GET``- /services/{nameService}
#### Description
Send info about a service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| nameService| ***Required*** The nameService use to get all the services auth |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with a the service's informations.
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.

### ``GET``- /services/{nameService}/actions
#### Description
Get actions from a specified service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| nameService| ***Required*** The nameService use to get all the services auth |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with the actions of the specified service
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.

### ``GET``- /services/{nameService}/actions/{nameActions}
Get an action from a specified service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| nameService| ***Required*** The nameService use to get all the services auth |
| nameAction| ***Required*** The nameAction use to get the information of it |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with specified action of the specified service
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.
### ``GET``- /services/{nameService}/reactions
Get reactions from a specified service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| nameService| ***Required*** The nameService use to get all the services auth |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with the reactions of the specified service
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.

### ``GET``- /services/{nameService}/reactions/{nameReaction}
Get reactions from a specified service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| nameService| ***Required*** The nameService use to get all the services auth |
| nameReaction| ***Required*** The nameReaction use to get the information of it |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with specific reaction of the specified service
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.

### ``GET``- /services/reactions/{idReaction}
Get a reaction from a specified service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| idReaction| ***Required*** The idReaction use it's own information |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with specific reaction of the specified service
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.
### ``GET``- /services/actions/{idAction}
Get a action from a specified service
#### Body fields 
| BODY FIELD | VALUE |
|--|--|
| idAction| ***Required*** The idAction use it's own information |
#### Response format
- A completed request will return a `200` response code, and inside the body a Json Array with specific action of the specified service
- When performing an action that is restricted, `401` to `404` will be returned together with a json containing a message error field.

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
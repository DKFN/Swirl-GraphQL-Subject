# An introduction to GraphQL

![Build](http://ops-factory.tetel.in/app/rest/builds/buildType:%28id:SwirlGraphqlBack_Build%29/statusIcon.png) *version 0.9* 

## The backend server is now offline due to costs, please let me know if you want me to reboot it

**JQuery demo**
![alt text](http://cdn.deadlykungfu.ninja/swirl/refv0-9.png)
Latest online version : http://cdn.deadlykungfu.ninja/demo/jquery/

**ReactJS demo**
![alt text](http://cdn.deadlykungfu.ninja/swirl/reactref.png)
Latest online version : http://cdn.deadlykungfu.ninja/demo/react/

**Early version note:**

``
You can start the project now, the subject will not longer have braking changes and will only have incremental additions.
``

## Content
 - Preface
 - A brief introduction to GraphQL
 - Meet the mini-Netflix GraphQL backend
    - How to query the server ?
    - What can I query ? (Schema in details)
    - A note about using variables, simply
    - TODO : Error handling
    - Schema in details
    - Going further
        - Using dev tools and postman to debug
        - TODO Bonus : Build your own strates !
        - TODO Bonus : Implement search !
- JQuery Reference: Architecture and Code explanations
- ReactJS Reference: Architecture and Code explanations

## Terminologies
 
 - Schema : A schema is the data-model of the API. Same as in SQL it defines the "Tables" and type of each field. It is the description of data's organisation.
 - REST : Very popular Architectural pattern to build API based on the HTTP protocol and allows strong client-server decoupling.
 - Strate : A strate is a themed-list of content, it is what you see on youtube and netflix homepage
   and this will soon be in your client too !
## Preface

The goal of this project is to show you a modern way to access data and how to use it frontend.

The subject schema is built for being simple to use and fun to play with, as such many GraphQL
specifications have not been implemented.

This time the server is NOT bundled with the frontend. You can clone the backend repo and run it
if you wish but the backend is already hosted on a VM.

(Pending version 1.0)
It is provided with a demo project built with JQuery as it is still the most used library,
even if it is old and can be painfull to use sometimes, the plethora of tutorials and the fairly
easy to use API will be an easy entry path for begineers.

(Pending version 1.0)
The most advanced of you will be disappointed with this choice ... This is why I also provide a little seed 
repo here containing a basic ReactJS install and a tiny custom wrapper around FetchAPI to get you started,
please note that this part however will not be covered in the docs.

Of course you are free to use any frontend stack you wish, don't hesitate to be creative !  All
you need to query GraphQL is a way to send HTTP request, the best way is the FetchAPI https://developer.mozilla.org/fr/docs/Web/API/Fetch_API but
you can use XMLHttpRequests or the JQuery  http://api.jquery.com/jquery.ajax/ wrapper around it. Using GraphQL clients is optional
and will be useful if you want enhanced functionnalities.

For any questions I am available on Swirl's Slack, I can also answer questions via Discord if you
wish to have more support on the subject, remember, we wish you to have fun, not to suffer !

## A brief introduction to GraphQL
Please see DOC.md if you need an introduction to GraphQL

## Meet the mini-Netflix GraphQL backend

*This part will cover the essentials you need to know to interact with the server,
as such I won't enter into technical details of its implementation here but feel free to check the repository https://github.com/DKFN/Swirl-graphql-back*

#### How to query the server ?

The server base URL is : *http://swirl-netflix.deadlykungfu.ninja/*

You will need to do POST queries to this route : *http://swirl-netflix.deadlykungfu.ninja/graphql*

*Before writing code I suggest you to try to query the server with Postman (or curl, but even if I love CLI,
writing graphQL queries seems painfull there). There are few words about using it later in this document if you need/*

The content of the query is defined by the schema, shortly explained you can query two things at the top level of the query:
 - Movie(s)
 - Strate(s) 
 
 First things first, we want a Homepage. I chose to have a little homepage, lets assume I want to
 display the films that will be out soon and some live action movies.
 
 For this I want two strates (lists), my strates will just contain the title and the image of the movie. I will also get the ID.
 
 So here is my query :
 
```$json
    query {
    	strates (names: ["soon", "anime"]) {
    		name
    		title
    		movies {
    			id
    			title
    			poster
    		}
    	}
    }
```

The server will reply me this body (for handling the body and displaying it on the frontend, see examples).

```$xslt
{
    "data": {
        "strates": [
            {
                "name": "soon",
                "title": "Prochaines Sorties",
                "movies": [
                    {
                        "id": 62541,
                        "title": "My Pure Land",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/62541.jpg"
                    },
                    {
                        "id": 62291,
                        "title": "Upgrade",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/62291.jpg"
                    },
                    {
                        "id": 60911,
                        "title": "Champions",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/60911.jpg"
                    },
                    {
                        "id": 28205,
                        "title": "Jurassic World : Fallen Kingdom",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/28205.jpg"
                    }
                ]
            },
            {
                "name": "anime",
                "title": "Live Actions",
                "movies": [
                    {
                        "id": 60678,
                        "title": "Tokyo Ghoul",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/60678.jpg"
                    },
                    {
                        "id": 31435,
                        "title": "Death Note",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/31435.jpg"
                    },
                    {
                        "id": 10745,
                        "title": "Dragon Ball Z - Battle of Gods",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/10745.jpg"
                    }
                ]
            }
        ]
    }
}
```
 
Alright its not bad ! I have the data I need for a very basic home but heee... It doesn't look very nice only two poor little lists losts
inside a big application. So I want to put big lights on one movie inside my home, I pick Deadpool2

So I enhanced my query with a Movie field, with the hardcoded id of my favorite movie

```
query {
	strates (names: ["soon", "anime"]) {
		name
		title
		movies {
			id
			title
			poster
		}
	}
	movie (id: 31798) {
		id
		title
		synopsis
		backdrop
		poster
		director
		releaseDate
		trailerYoutubeId
	}
}

```

Giving me more data to build a nice interface !

```$xslt
{
    "data": {
        "strates": [
            {
                "name": "soon",
                "title": "Prochaines Sorties",
                "movies": [
                    {
                        "id": 62541,
                        "title": "My Pure Land",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/62541.jpg"
                    },
                    {
                        "id": 62291,
                        "title": "Upgrade",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/62291.jpg"
                    },
                    {
                        "id": 60911,
                        "title": "Champions",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/60911.jpg"
                    },
                    {
                        "id": 28205,
                        "title": "Jurassic World : Fallen Kingdom",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/28205.jpg"
                    }
                ]
            },
            {
                "name": "anime",
                "title": "Live Actions",
                "movies": [
                    {
                        "id": 60678,
                        "title": "Tokyo Ghoul",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/60678.jpg"
                    },
                    {
                        "id": 31435,
                        "title": "Death Note",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/31435.jpg"
                    },
                    {
                        "id": 10745,
                        "title": "Dragon Ball Z - Battle of Gods",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/10745.jpg"
                    }
                ]
            }
        ],
        "movie": {
            "id": 31798,
            "title": "Deadpool 2",
            "synopsis": "Après avoir miraculeusement survécu à une violente attaque bovine, un chef de cafétéria défiguré (Wade Wilson) se bat désormais pour réaliser son rêve ; devenir le barman le plus sexy de Mayberry , alors qu’il a complètement perdu son sens du goût.  Pour retrouver les plaisirs pimentés de la vie, et aussi son convecteur temporel, Wade devra affronter des Ninjas, des Yakuza et une horde de chiens méchamment en chaleur.  Au cours d’un voyage autour du monde, il va découvrir l’importance de la famille, de l’amitié et des saveurs, ainsi qu’un goût insoupçonné pour l’aventure. Il finira par remporter le prestigieux mug personnalisé de “Meilleur Coup du Monde”.",
            "backdrop": "https://www.betaseries.com/images/films/backdrops/fr/31798.jpg",
            "poster": "https://www.betaseries.com/images/films/affiches/fr/31798.jpg",
            "director": "David Leitch",
            "releaseDate": "2018-05-16",
            "trailerYoutubeId": "2rJNGSRVq2w"
        }
    }
}
```

Ok but it still feels a bit empty so now I want the users to get more than stars or percentage for
reviewing my awesome movie so I want to display some comments and put them in a nice slideshow effect ! : 

```$xslt
query {
	strates (names: ["soon", "anime"]) {
		name
		title
		movies {
			id
			title
			poster
		}
	}
	movie (id: 31798) {
		id
		title
		synopsis
		backdrop
		poster
		director
		releaseDate
		comments {
			id
			login
			avatar
			text
		}
	}
}
```

```$xslt
{
{
    "data": {
        "strates": [
            {
                "name": "soon",
                "title": "Prochaines Sorties",
                "movies": [
                    {
                        "id": 62541,
                        "title": "My Pure Land",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/62541.jpg"
                    },
                    {
                        "id": 62291,
                        "title": "Upgrade",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/62291.jpg"
                    },
                    {
                        "id": 60911,
                        "title": "Champions",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/60911.jpg"
                    },
                    {
                        "id": 28205,
                        "title": "Jurassic World : Fallen Kingdom",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/28205.jpg"
                    }
                ]
            },
            {
                "name": "anime",
                "title": "Live Actions",
                "movies": [
                    {
                        "id": 60678,
                        "title": "Tokyo Ghoul",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/60678.jpg"
                    },
                    {
                        "id": 31435,
                        "title": "Death Note",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/31435.jpg"
                    },
                    {
                        "id": 10745,
                        "title": "Dragon Ball Z - Battle of Gods",
                        "poster": "https://www.betaseries.com/images/films/affiches/fr/10745.jpg"
                    }
                ]
            }
        ],
        "movie": {
            "id": 31798,
            "title": "Deadpool 2",
            "synopsis": "Après avoir miraculeusement survécu à une violente attaque bovine, un chef de cafétéria défiguré (Wade Wilson) se bat désormais pour réaliser son rêve ; devenir le barman le plus sexy de Mayberry , alors qu’il a complètement perdu son sens du goût.  Pour retrouver les plaisirs pimentés de la vie, et aussi son convecteur temporel, Wade devra affronter des Ninjas, des Yakuza et une horde de chiens méchamment en chaleur.  Au cours d’un voyage autour du monde, il va découvrir l’importance de la famille, de l’amitié et des saveurs, ainsi qu’un goût insoupçonné pour l’aventure. Il finira par remporter le prestigieux mug personnalisé de “Meilleur Coup du Monde”.",
            "backdrop": "https://www.betaseries.com/images/films/backdrops/fr/31798.jpg",
            "poster": "https://www.betaseries.com/images/films/affiches/fr/31798.jpg",
            "director": "David Leitch",
            "releaseDate": "2018-05-16",
            "comments": [
                {
                    "id": 440711,
                    "avatar": "https://img.betaseries.com/g9KvSUwUNU3hpsbzuiT8kaSS6k0=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2F82%2F828d87ce58c913bce23a3f006c33c9fc.jpg",
                    "text": "Je suis impatient de voir ce que va donner le deuxième film ! J'espère qu'il sera aussi explosif que le premier. ",
                    "login": "Flash54"
                },
                {
                    "id": 455076,
                    "avatar": "https://img.betaseries.com/OKAvZMm5t4hNYMwPVEU1MANS3G4=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2Ffb%2Ffb4e87db93b34e8fa15a0dc89a8e53fa.jpeg",
                    "text": "La bande annonce me donne vraiment envie de le voir (surtout grâce à tous ces Easter Egg)!!",
                    "login": "iki2000"
                },
                {
                    "id": 601199,
                    "avatar": "https://img.betaseries.com/4hNV-1gi2-VViC3PgYApbYRdW6k=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2F38%2F387c3cf471444138c7a1e7dc4700246c.jpg",
                    "text": "Le premier film ne m'avait pas particulièrement plu. Je l'avais trouvé sympa mais sans plus. J'étais lassée de l'engouement. Mais ce second film... J'ai vraiment adoré ! J'ai pris un pied pas possible du début jusqu'à la fin... Et en fait, je fais le constat que mine de rien, Deadpool et ses vannes m'avaient manqué.",
                    "login": "Slytheerin"
                },
                {
                    "id": 601226,
                    "avatar": "https://img.betaseries.com/bVYtCpOHlQIYxglDzv9LTnRJFvg=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2Fad%2Fadd9265c7efa9b3221fcc93441ea1ddf.jpg",
                    "text": "Du bon Deadpool comme on aime! De l'humour et du trash !",
                    "login": "ToToxe"
                },
                {
                    "id": 601285,
                    "avatar": "",
                    "text": "Il se laisse regarder, pas trop de nouveauté du fait de l'originalité du ton du 1er. Mais il n'est pas un chef d'œuvre, mais ce n'est pas un navet non plus.",
                    "login": "PJO"
                },
                {
                    "id": 601326,
                    "avatar": "https://img.betaseries.com/erbrRusPxYDFZOmJL1kuMIVlOe0=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2Fab%2Fab8bec78c895f83407ada22c9f6196fa.jpg",
                    "text": "Excellent ! On rigole (BEAUCOUP) du début a la fin mais les scènes d’action n’en sont pas moins crédibles et ça c’est plutôt très fort. Gros point positif sur la scène post crédits qui est juste excellente. ",
                    "login": "YOUTHLY"
                },
                {
                    "id": 602377,
                    "avatar": "https://img.betaseries.com/tBdbxjqT-V2HH8dA7EU1DZpI3b8=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2Ff1%2Ff1e28b54decb774ca1dd14633564e048.jpg",
                    "text": "simply amazing 👌🖒",
                    "login": "Orelink"
                },
                {
                    "id": 602943,
                    "avatar": "https://img.betaseries.com/alZqyLa-CDHs1xt1rXHi_BBnwXk=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2F7c%2F7c4ee05c0d4128c59e484acf4b8aead0.jpg",
                    "text": "Pas forcément bon client de l'univers Marvel de base, j'ai vraiment passé un bon moment devant Deadpool 2, meilleur que le premier !",
                    "login": "Pilbao"
                },
                {
                    "id": 604232,
                    "avatar": "https://img.betaseries.com/GIJgH6vWDmxglv6Q0NYMq4qi9EA=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2F2c%2F2cd26117f19db726b41baf2f84317a05.jpg",
                    "text": "Ohlala j’ai passé mon temps à rigoler vraiment, et d’ailleurs j’ai kiffé toutes les références présentes dans le film, excellent ",
                    "login": "NIALLASSE"
                },
                {
                    "id": 606069,
                    "avatar": "https://img.betaseries.com/_s4EZ4vwxhKz-mAqBS97hCVeJik=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2F89%2F8905687d5b0f305a401ba8f83168a893.jpg",
                    "text": "Toutes ces phrases assassines envers DC Comics... Ahaha j'aurais bien rigolé ! Sans oublier la petite dédicace à Green Lantern ! x)\r\nFranchement très bon moment. Surtout tout le passage avec les X Force, le recrutement et leur déchéance ! \r\n\r\nTrès très bon film! Aussi bon que le premier.\r\n\r\n+5",
                    "login": "Freedom4Arts"
                },
                {
                    "id": 606450,
                    "avatar": "https://img.betaseries.com/h7kVU28ibi3q3N8UNCO36NV4Fgw=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2Fb7%2Fb7f94a9372f2812dd09556d0f967a674.jpg",
                    "text": "Pour ne pas changer mes bonnes habitudes je suis allée voir un second opus sans avoir vu le premier volet. Cependant je ne me suis pas sentie perdue et j'ai réussi assez aisément à rentrer dans l'univers et dans l'histoire faut dire que je ne pouvais pas passer à côté de la fabuleuse promotion autour du film et je savais donc à quoi m'attendre. \r\nDeadpool est drôle et détonne comme promis des autres Marvel par contre il ne faut pas non plus chercher une grande finesse de propos et d'histoire.\r\nJ'ai passé un moment sympathique avec un scénario plutôt entraînant et des scènes d'actions qui sont assez bluffantes.\r\nRyan Renolds est somptueux dans ce rôle et cela ne m'étonne pas du tout de cet acteur que j'adore il est vraiment LE point fort de cette franchise.\r\nC'est un film donc vraiment efficace, piquant et qui change d'un Marvel classique.",
                    "login": "Lutetia30"
                },
                {
                    "id": 606603,
                    "avatar": "",
                    "text": "Des barres de rire à la hauteur du premier (voire plus !).\r\nOn développe un peu plus le profil du héros tout en se permettant un peu plus de fan service, toujours avec humour et sans se prendre au sérieux. \r\nLes acteurs sont excellents (Ryan au top, Josh un peu perdu si on en croit ses interviews mais il fait le boulot) et les SFX raisonnables sachant qu'on est pas sur un budget d'avengers ou de X-men. \r\n\r\nExcellent divertissement typé R comme on aimerait en voir plus souvent.",
                    "login": "Shuenli"
                },
                {
                    "id": 606745,
                    "avatar": "https://img.betaseries.com/F854oFIB3ucWEf70ctsWyflCQno=/250x250/smart/https%3A%2F%2Fwww.betaseries.com%2Fdata%2Favatars%2F20%2F20ee7b51a9d218e818d5f0c749e55297.jpg",
                    "text": "moins bon que le premier (effet de surprise passé), on ne s'ennuie pas mais ils peinent à peu quand ils essayent de nous en faire quelque chose de sérieux... la scène post générique par contre est parfaite.",
                    "login": "fredolagachette"
                }
            ]
        }
    }
}
```

Finally, if you want to rename fields or query multiple times the same entry point* you can use aliases:

**Still I recommend you to use plural versions, see below for explanations*
```$xslt
query {
	flagship: movie (id: 31798) {
		id
		title
		synopsis
		background: backdrop
		picture: poster
		director
		releaseDate
	}
}

```

Giving me this body :
```$xslt
{
    "data": {
        "flagship": {
            "id": 31798,
            "title": "Deadpool 2",
            "synopsis": "Après avoir miraculeusement survécu à une violente attaque bovine, un chef de cafétéria défiguré (Wade Wilson) se bat désormais pour réaliser son rêve ; devenir le barman le plus sexy de Mayberry , alors qu’il a complètement perdu son sens du goût.  Pour retrouver les plaisirs pimentés de la vie, et aussi son convecteur temporel, Wade devra affronter des Ninjas, des Yakuza et une horde de chiens méchamment en chaleur.  Au cours d’un voyage autour du monde, il va découvrir l’importance de la famille, de l’amitié et des saveurs, ainsi qu’un goût insoupçonné pour l’aventure. Il finira par remporter le prestigieux mug personnalisé de “Meilleur Coup du Monde”.",
            "background": "https://www.betaseries.com/images/films/backdrops/fr/31798.jpg",
            "picture": "https://www.betaseries.com/images/films/affiches/fr/31798.jpg",
            "director": "David Leitch",
            "releaseDate": "2018-05-16"
        }
    }
}
```

Of course, you can go way further than this and feel free to implement nice thing frontwise, one other little thing to be noted about this
API is that it was designed with the minset "If you can query one you can query many", as such each entry point has a plural variant (movie -> movies, strate -> strates)
taking arrays of ids/names and returning arrays of elements. IF needed I will provide more examples and or more endpoints depending on what you wish :) *

You might have noticed that even if we have greatly enhanced the quantity of data the response time has not grown, this
is because the backend handles each fetching part in a thread so even with more data being displayed the response time will be relatively the same.

This is another advantage of graphql, it allows the complexity and cost of fetching in multiple endpoints moved from 
the clients device to the backend architecture
which has a relatively stable performance and relieves little devices of handling so many instructions, and having to handle multiple connections instead of one. (Besides the bonus of not loading huge JSON documents in RAM).

One query to catch'em all.

**And for the bravest, we can take a deep dive into server implementation in Scala to implement your feature*

*Do not hesitate to submit or your ideas for the backend, even small contributions like adding movies or strates is nice!*
### Schema in details

This part is not very documented as it is subject to change before the 1.0

*The schema will frequently make new informations available, be sure to check it often if you wish to have a rich experience and contact me if you want more data to be available*


*An exclamation mark after a type means that it is mandatory for a parameter and non-nullable for a value*

#### Entry points
```$xslt
  # Returns a movie with given Id
  movie(id: Int!): Movie

  # Returns a list of movies with given Ids
  movies(id: [Int!]!): [Movie!]!

  # Returns a list of movies with given themes.
  strate(name: String!): [Movie!]!

  # Returns lists of movies with given themes. Returns all strates if no parameter given
  strates(names: [String!]!): [[Movie!]!]!
```

#### Object types 
```$xslt
# An user comment about a movie
type Comment {
  id: Int!
  date: String!
  login: String!
  avatar: String!
  text: String!
}

# A movie that is a bit known
type Movie {
  id: Int!
  title: String!
  poster: String!
  backdrop: String!
  releaseDate: String!
  director: String!
  synopsis: String!
  trailerYoutubeId: String!
  comments: [Comment!]!
}

type Query {
  # Returns a movie with given Id
  movie(id: Int!): Movie

  # Returns a list of movies with given Ids
  movies(id: [Int!]!): [Movie!]!

  # Returns lists of movies with given themes.
  strate(name: String!): Strate!

  # Returns lists of movies with given themes.
  strates(names: [String!]!): [Strate!]!
}

# A strate used to display a list of movies
type Strate {
  name: String!
  title: String!
  movies: [Movie!]!
}

```

## JQuery Reference : Architecture and code explanations

The frontend version aims to provide you basic functionnalites to get started quickly and is a great option if you want
to try the frontend part easily* before having dedicated subjects on frontend frameworks.

To launch the client in your browser simply open index.html, it should work fine. If not, please send me a message.

**By easy I mean easier than other techs, of course you may run into hard problems, don't hesitate to post on the slack or join the Discord*

#### File tree
![alt text](http://cdn.deadlykungfu.ninja/swirl/sourceTree.png)

**Root directory**

*app.css*
Contains the basic style of the application. Nothing very crazy here :)

*index.html* Is the skeleton of the app, let me insist with the word of skeleton watch this code, it is responsible for
containing Deadpool 2 in the reference :

```html$
<!-- Flagship movie !-->
<div class="panel panel-default flagship-movie-container">
    <div class="panel-body" id="flagship-movie-content">
        <div class="col-md-4">
            <div class="flagship-movie-poster">
            </div>
        </div>
        <div class="flagship-movie-content col-md-8">
            <div class="flagship-movie-infos">
                <span class="flagship-movie-title"></span> <br />
                <span class="flagship-movie-director"></span>
                <span class="flagship-movie-releaseDate"></span> <br /><br />
            </div>
            <div class="flagship-movie-synopsis">
            </div>
            <div class="flagship-movie-youtube" style="text-align: center; position: relative;">
            </div>
        </div>
    </div>
</div>
```

As you can see it is an empty shell ! There is not a single text, only a lot of classnames with revelant names on what will be filled after load! You will see on the JS folder
explanation part how it is filled with informations from the backend

Another part to keep in mind for now is this simple empty div, we will get back to it later:

```$xslt
<div class="home-strates-container">

</div>
```

**Javascript directory**

*client.js* is a wrapper I made to ease you the process of sending queries to the server, it takes your query as a parameter
and will return you a function. You will see below how to use it

```$javascript
const callNetflixBackend = (targetQuery) 
```

*queries.js*

It contains all the queries of the applications, for now there is only the homepage query:
```$xslt
var homepageQuery = `
query {
	strates (names: ["soon", "anime", "drames", "thrillers", "noirblanc", "sciencefiction", "horreur", "fantastique"]) {
		name
		title
		movies {
			id
			title
			poster
		}
	}
	movie (id: 31798) {
		id
		title
		synopsis
		backdrop
		poster
		director
		releaseDate
		trailerYoutubeId
	}
}`;
```

As you see, it is using backquotes, let me introduce you right now a simple way to template and add variables to your string such
as your GraphQL queries but also to your templates (see below, again ^^).

I could set the id dynamically if I want to often change my flagship movie for example
```$xslt
var homepageQuery = (myId) => `
query {
	strates (names: ["soon", "anime", "drames", "thrillers", "noirblanc", "sciencefiction", "horreur", "fantastique"]) {
		name
		title
		movies {
			id
			title
			poster
		}
	}
	movie (id: ${myId}) {
		id
		title
		synopsis
		backdrop
		poster
		director
		releaseDate
		trailerYoutubeId
	}
}`;
```

And ... that's it. Backquotes are very powerful in JS and I just wrap my query in an anonymous function taking the id in parameter
the ${variableName} operator allows me to "paste" its value inside the string. Its sexy and the ${} operator can also execute code !! Neat if you want to write an array of ids or even more complex things !

*index.js*

So this is the big part !

First lets see the main :

```$xslt
// This is the "Main" of my webpage, it will be executed after the browser has loaded the "display" elements
$(document).ready(() => {
    getHomepage();
    easyFadeAnimation($(".navbar .navbar-header"), 300, 250);
    $(".container").css("height", $(window).height());
});
```
I do three things, the two last ones are cosmetics so I won't get deep into it, even if I will explain easyFadeAnimation later
. If there are parts you don't understand here It will be good that you check those links:

- The $ selector and how to get DOM elements (div, span, nav etc...): https://www.w3schools.com/jquery/jquery_ref_selectors.asp
- .ready function : http://learn.jquery.com/using-jquery-core/document-ready/
- .css function : http://api.jquery.com/css/

So next is ``getHomepage()`` so let's scroll up and see what it do:

```$xslt
// As you can see there I create a getHomepage function, taking the homepageQuery and when I have a reponse from the back
// I attach an anonymous function, that will be executed when query is complete and it will call renderHomepage with the data
const getHomepage = () => callNetflixBackend(homepageQuery)
    .done((reponseData) => renderHomepage(reponseData));
```

You saw the ``callNetflixBackend(targetQuery)`` here is a concrete application, it returns an AJAX object and behaves so.

Here I attach another anonymous function (beware, you will see lots of them :) ) call done, done will get as parameter
the data from the server, having the JSON response I can then pass it to ``renderHomepage(responseData)`` which will use it to render the homepage.

So lets see ``renderHomepage()``
```
const renderHomepage = (data) => {
    renderTopPageMovie(data["data"]["movie"]);
    renderAllStrate(data["data"]["strates"]);
};
```

There it just calls two different functions, each of them takes a part of the data, it allows us a nice decoupling of the rendering and we can also extend
this for maximum reusability !

Anyway, I am too turnt up, so lets just open ```renderHomepage()```

```$xslt
// Here I just persist all my data to the HTML
const renderTopPageMovie = (dataForMovie) => {
    // Animations
    easyFadeAnimation($(".flagship-movie-content"), 1500, 1000);
    easyFadeAnimation($(".flagship-movie-poster"), 200, 1000);

    // Now I set the content I want based on data I received
    $(".flagship-movie-title").text(dataForMovie["title"]);
    $(".flagship-movie-director").text(dataForMovie["director"]);
    $(".flagship-movie-synopsis").text(dataForMovie["synopsis"]);
    $(".flagship-movie-releaseDate").text(dataForMovie["releaseDate"]);

    $(".flagship-movie-poster").append(`<img width="250px" style="float: left" src="${dataForMovie["poster"]}" />`);
    $(".flagship-movie-container").css('background-image', 'url("'+dataForMovie["backdrop"]+'")');
    $(".flagship-movie-youtube").append(makeYoutubeLink(dataForMovie["trailerYoutubeId"]));
};
```

Aside from the animations part this is where the data gotten from the server is persisted to the HTML, it is a classical render scheme
for JQuery apps and is OK for simple content load but will get messy if you have to render it many times after one data fetch.

I invite you to search in JQuery documentation to see how the functions I use behave and seek other functions to use.

*If you have spotted `makeYoutubeLink()` is what I call a template, its some lines below*

So let's go to the next function, `renderAllStrate()` :

```$xslt
const renderAllStrate = (dataForAllStrates) => {
    /*
     * This is equivalent to this :
     *
     * for (int i = 0; i < dataForAllStrates.length; ++i) {
     *      renderAStrate(dataForAllStrates[i]);
     * }
     *
     * But let's enjoy that we are not in C and we have nicer concepts :D
     */
    dataForAllStrates.map((strateData, key) => renderAStrate(strateData, key))
};
```
If have an Array of Strate Objects (see schema) so I want to get through all of them and call of function that will handle

Lets move to `renderAStrate()` !

```$xslt
const renderAStrate = (dataForMyStrate, strateKey) => {
    const allStratesContainer = $(".home-strates-container");
    easyFadeAnimation(allStratesContainer, 1500, 800);
    easyFadeAnimation($(".strate-poster"), 2200, 500);

    allStratesContainer
        .append(
            buildStrateTemplate(
                strateKey,
                dataForMyStrate["title"],
                dataForMyStrate["poster"],
                dataForMyStrate["movies"]
        ));
};
```

Remember the empty div in index.html ? Here is where it gets filled when data is received !

As you can see, aside from animations, I add (append) something return from `buildStrateTemplate(...)`,
exactly like for the GraphQL query, it is taking parameters to render a string (here a full html dom tree contaning divs, text and images)

So let's open ...

#### Templates
Straightforward, as you are familliar with templates lets open ``buildStrateTemplate(...)``

```$xslt
const buildStrateTemplate = (strateKey, title, poster, movies) => `
    <div class="strate-container">
        <div class="strate-title">
            ${title}
        </div>
        ${ movies.map(x => buildStrateMovie(x, strateKey)) }
    </div><br />
`;
```

Again it is building the divs containing the data but instead of letting JQuery handle the replacing of the content
one by one it is directly putting it while rendering the template.

Of course it is more efficient because there is a lot of movies to render but also your code might be very very messy. Of course there are other ways to get a clean
result but I just wanted to share one way :)

And finally, in the end we have the `buildStrateMovie()`, also a template builder
````
const buildStrateMovie = (movieData, strateKey) => `
<div class="strate-movie-container">
    <div class="strate-poster">
        <img width="256px" src="${ movieData["poster"] }"/>
    </div>
    <div class="strate-movie-title">
        ${ movieData["title"].length > 20 ? movieData["title"].substring(0, 19) + "..." : movieData["title"] }
    </div>
</div>
`;
````

Yet again it renders one movie poster with title, cutting the title if it risks to overflow the div size.

## ReactJS Reference: Architecture and code explanations

TODO

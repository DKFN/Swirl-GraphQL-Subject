# An introduction to GraphQL

*version 0.8*

![alt text](http://cdn.deadlykungfu.ninja/ref.png)

Latest online version : http://cdn.deadlykungfu.ninja/demo/jquery/

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
    - Error handling
    - Schema in details
    - Going further
        - Using dev tools and postman to debug
        - Bonus : Build your own strates !
        - Bonus : Implement search !
        - Variables substitution
        - Pagination
        - Getting Schema definition via a query
 - Simple frontend boilerplate
    - Code explanations

## Terminologies
 
 - Schema : A schema is the data-model of the API. Same as in SQL it defines the "Tables" and type of each field. It is the description of data's organisation.
 - REST : Very popular Architectural pattern to build API based on the HTTP protocol and allows strong client-server decoupling.
 - Strate : A strate is a themed-list of content, it is what you see on youtube and netflix homepage
   and this will soon be in your client too !
## Preface

The goal of this project is to show you a moden way to access data and how to use it frontend.

The subject schema is built for being simple to use and fun to play with, as such many GraphQL
specifications have not been implemented

This time the server is NOT bundled with the frontend. You can clone the backend repo and run it
if you wish but the backend is already hosted on a VM.

(Pending version 1.0)
It is provided with a demo project built with JQuery as it is yet the most used library yet,
even if it is old and can be painfull to use sometimes, the plethora of tutorials and the fairly
easy to use API will be an easy entry path for begineers.

(Pending version 1.0)
The most advanced of you will be disapionted of this choice ... This is why I also provide a little seed 
repo here containing a basic ReactJS install and a tiny custom wrapper around FetchAPI to get you started,
please note that this part however will not be covered in the docs.

Of course you are free to use any frontend stack you wish, don't hesitate to be creative !  All
you need to query GraphQL is a way to send HTTP request, the best way is the FetchAPI https://developer.mozilla.org/fr/docs/Web/API/Fetch_API but
you can use XMLHttpRequests or the JQuery  http://api.jquery.com/jquery.ajax/ wrapper around it. Using GraphQL clients is optionnal
and will be usefull if you want enhanced functionnalities.

For any questions I am available on Swirl's Slack, I can also answer questions via Discord if you
wish to have more support on the subject, remember, we wish you to have fun, not to suffer !

## A brief introduction to GraphQL
Please see DOC.md if you need an introduction to GraphQL

## Meet the mini-Netflix GraphQL backend

*This part will cover the essentials you need to know to interract with the server,
as such I won't enter technical details of its implementation here but feel free to check the repository https://github.com/DKFN/Swirl-graphql-back*

#### How to query the server ?

The server base URL is : *http://45.76.45.208:9000/*

You will need to do POST queries to this route : *http://45.76.45.208:9000/graphql*

*Before writing code I suggest you to try to query the server with Postman (or curl, but even if I love CLI,
writing graphQL queries seems painfull there). There are few words about using it later in this document if you need/*

The content of the query is defined by the schema, shortly explained you can query two things at the top level of the query:
 - Movie(s)
 - Strate(s) 
 
 First things first, we want an Homepage. I choosed to have a little homepage, lets assume I want to
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

The server will reply my this body (for handling the body and displaying it on the frontend, see examples).

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
 
Alright its not bad ! I have the data I need for a very basic home but heee... It don't look very nice only two poor little lists losts
inside a big application. So i want to put big lights on one movie inside my home, I pick Deadpool2

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

Ok but it still fills a bit empty so now I wan't the users to get more than stars or percentage for
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

Of course, you can go way further than this and feel free to implement nice thing frontwise, one orther little thing to be noted about this
API is that it was designed in the minset "If you can query one you can query many", as such each entry point has a plural variant (movie -> movies, strate -> strates)
taking arrays of ids/names and returning arrays of elements. IF needed I will provide more examples and or more endpoints depending on what you wish :) *

You might have notice than even if we have greatly enhanced the quantity of data the response time have not grown, this
is because the backend handles each fetching part in a thread so even with more data being displayed the response time will relatively the same.

This is anorther advantage of graphql, it allows the complexity and cost of fetching in multiple endpoints moved from 
the clients device to the backend architecture
whom as a relatively stable performance and relief little devices of handling so much instructions, and having to handle multiple connections instead of one. (Besides the bonus of not loading huge JSON documents in RAM).

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
  avatar: String
  text: String!
}

# A movie that is a bit known
type Movie {
  id: Int!
  title: String!
  poster: String
  backdrop: String
  releaseDate: String!
  director: String!
  synopsis: String!
  trailerYoutubeId: String
  comments: [Comment]! // Array can be empty but never null
}
```

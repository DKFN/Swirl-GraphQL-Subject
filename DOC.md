From wikipedia : 

```
GraphQL is a data query language developed internally by Facebook in 2012 before
being publicly released in 2015.
It provides an alternative to REST and ad-hoc web service architectures.
It allows clients to define the structure of the data required, and exactly the
same structure of the data is returned from the server.

It is a strongly typed runtime which allows clients to dictate what data
is needed, therefore preventing excessively large amounts of data being
returned.
```

This quote says pretty sums it up, GraphQL allow you, the frontend, to define exactly what you want
to query, and you will get a Response following the exact graph of your query.

This as many advantages such as powerfull data comsumption, easy evolution of the backend
without affecting ways to query, and of course, you know what you want better than anyone else.

So how to use it ?

*If you wish concrete code examples on how to do this, check the example directory in this repository **after reading the subject***

As said in the preface there are many clients available but these are not mandatory at all.

You need to send to the graphql endpoint a POST query with a body describing your query and variables if you have some :

As for example, there I want to fetch all the PetitsFruits and know if I have enough: 
```$graphql
{
    query {
        petitsFruits {
            name
            stock
        }
    }
}
```

As you can see it looks like JSON but is not JSON ! Don't worry the response  is JSON compilant an will be easy to parse:
```$json
 {
    "data": {
        "petitsFruits": [
            {
                "name": "Orange",
                "stock": 42
            } , {
                "name": "Apple",
                "stock": 8000
            }
        ]
    }
 }
```

As simple as that, of course in my database I also have the country of origin, the price I paid and the list of the ING1s
that eated previous PetitsFruits. If I wish to query the country of origin I will just need to add country inside the query body.

On the query side I could filter the origin country, for example if the server schema implements it I could write this :

```$graphql
{
    query {
        petitsFruits (country: "France") {
            name
            stock
        }
    }
}
```

This is all you need to know about GraphQL specification for now, of course it is much deeper
than that but If you enjoyed GraphQL we might get to them in the future.

So this was a very abstract example, let's get into real things would you ?
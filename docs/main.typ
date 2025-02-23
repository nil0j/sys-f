#set par(justify: true)
#set text(
  font: "Libertinus Serif",
  size: 12pt,
)


#align(center, text(24pt)[
  *MP08 - Final project*
])
#align(center, text(14pt)[
    Nil Jimeno - ETP Xavier
])

= Structure
The project is divided in 2 main sections:
the client, which is just a GUI client
to access the api remotely,
and the api.

#image("1.png")

== The client
The client consists of an html file, a css file and a js file.
It has a bare bones structure.

== Backend (API)
The API attempts to replicate an MVC kind of structure.
It starts at app.js, which is the main file,
and then the routes file,
which divides its branches to other folders such as
the models and the controllers.

== Models
There are 2 main models in the application:
LibraryMySQL and LibraryMongo,
one for each database.
These contain the functions that will interact
with the desired database.
Then there's Patchouli (whose name is a bad pun),
that exports the functions from the appropiate database.

#image("2.png")

The configuration files for the models are not only outside
the models folder, but also don't use a .env file to save credentials.
Then there's also the middleware folder, which is called "mw"
(not very self-explainatory)
that is supposed to interact with the database from outside the models folder.

#image("8.png")

There is also a .sql file (done by me), which is quite bad.
Ideally, you would use something like a shell script or the like.

== Controllers
These manage the surface-level api logic and interact with both the model and the client.
They process the values from the client and send them to the model
(including the authentication model, which is not in the models folder (bad)),
then wait for the response, process it and send it back to the client.


= MongoDB adaptation
The MongoDB library effectively works the same as MongoDB,
having the same commands to interact with the database.
Most of that work was to replace the SQL code into MongoDB code directly,
but there has also been some issues with concurrency
since js does not allow waiting for asyncronous functions
in a constructor class.
To solve that, the program creates a connection at the beggining of each route,
which is definitely not the best solution but it kind of works!

The database used can be changed in the .env file.

== Screenshots
#image("3.png")
#image("4.png")
#image("5.png")
#image("6.png")
#image("7.png")
Why not just check the code yourself...



= JWT
A middleware has been implemented in the server
and is being called from app.js:

#image("9.png")
#image("10.png")

A new controller has been added for the login route,
which gets the POST values to check if the user and password match.

The login implementation is scuffy to say the least:
#underline[
it doesn't connect to any database
because 1. there is no way to register new users
and 2. security has been completely disregarded
since passwords have been saved outside of a dotenv],
therefore it wouldn't make sense.
Plus, it hasn't been specified anywhere so it's not a requirement.


#image("11.png")


As for the frontend of the page,
#underline[no changes were required according to the instructions].

Insert your token in the input box
and lock it with the lock button
(careful with the extra spaces!!).
Negated requests will not be notified
since that wasn't specified anywhere,
and for logins you still have to use
an application like curlie or the like.

#image("13.png")
#image("12.png")

// Función de generación del token a partir de usuario y contraseña

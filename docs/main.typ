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

= Intro
There is nothing to explain here.
Most of the project structure has been enforced
so there's nothing we did that needs "justification".
What I'm reviewing is not my code,
but yours.


= Structure
The project is divided in 2 main sections:
the client, which is just a GUI client
to access the api remotely,
and the api.

== The client
The client consists of an html file, a css file and a js file.
It has a bare bones structure.

== The server
The server attempts to replicate an MVC kind of structure.
It starts at app.js, which is the main file,
and then it divides its branches to other folders such as
the models, the controllers and the views.

== Models
There are 2 main models in the application:
LibraryMySQL and LibraryMongo,
one for each database.

These two are supposed to be able to be changed.


For some reason there's a couple of folders
related to the model that are separated from it:

The configuration files for the models are OUTSIDE the models folder,
and not even properly saved (they should be in a .env).

Then there's also the middleware folder, which is called "mw" 
(this is not a self-explainatory name and breaks multiple Clean Code principles).



// Función de generación del token a partir de usuario y contraseña

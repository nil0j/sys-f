/* change to switch Library file */
const useMongo = false

const LibraryMongo = require('../models/LibraryMongo')
const LibrarySql = require('../models/LibraryMySQL')

const Library = useMongo ? LibraryMongo : LibrarySql

// Declaración de controladores 
const getBooks = (async (_, res) => {
    try {
        // Instanciamos un modelo Library
        let library = new Library({});
        // Lo usamos para listar libros
        let books = await library.listAll();
        res.json(books);
        library.close();
    }
    catch {
        res.json("Error getting books...");
    }
})

const createBook = (async (req, res) => {
    try {
        // Instanciamos un modelo Library
        console.log("hello")
        let library = new Library({});

        // Creamos un libro nuevo
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        };

        // Usamos el modelo Library para crear libro
        let created = await library.create(newBook);

        if (created) {
            console.log("Product created successfully")
            res.json("Product created successfully")
        }
        else {
            console.log("Error creating new book...")
            res.json("Error creating new book...");
        }
        library.close()
    }
    catch {
        console.log("Error creating new book...")
        res.json("Error creating new book...");
    }
})

const updateBook = (async (req, res) => {
    let library = new Library({});
    try {
        // Instanciamos un modelo Library

        let id = req.body.id

        // Creamos un libro nuevo
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        };

        // Usamos el modelo Library para crear libro
        let created = await library.update(id, newBook);

        if (created) {
            console.log("Product updated successfully")
            res.json("Product updated successfully")
        }
        else {
            console.log("Error updating book...")
            res.json("Error updating book...");
        }
        library.close()
    }
    catch {
        library.close()
        console.log("Error creating new book...")
        res.json("Error creating new book...");
    }
})

const deleteBook = (async (req, res) => {
    let library = new Library({});
    try {
        // Instanciamos un modelo Library

        let id = req.body.id

        // Usamos el modelo Library para crear libro
        let created = await library.delete(id);

        if (created) {
            console.log("Product deleted successfully")
            res.json("Product deleted successfully")
        }
        else {
            console.log("Error deleting new book...")
            res.json("Error deleting new book...");
        }
        library.close()
    }
    catch {
        library.close()
        console.log("Error deleting new book...")
        res.json("Error deleting new book...");
    }
})

module.exports = {
    getBooks: getBooks,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook
}

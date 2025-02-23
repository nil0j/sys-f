const express = require('express')
const books = require('../controllers/books.js')
const login = require('../controllers/login.js')

// Instanciación del servidor
const router = express.Router()

// Configuración de las rutas
router.get('/api/books', books.getBooks)
router.post('/api/books', books.createBook)
router.put('/api/books', books.updateBook)
router.delete('/api/books', books.deleteBook)
router.post('/api/login', login.login)
module.exports = router

const express = require('express')
const cors = require('cors')
const auth = require('./mw/auth')
const routes = require('./routes/routes.js')

// Instanciación del servidor
const app = express()

// Configurar middleware
app.use(cors())
app.use(express.json())  // para parsear contenido JSON
app.post('/api/books', auth.authenticateToken)
app.put('*', auth.authenticateToken)
app.delete('*', auth.authenticateToken)
app.use('/', routes)      // para enrutar peticiones

// Arranque del servidor
app.listen(5000, () => {
    console.log('server is listening on port 5000')
})

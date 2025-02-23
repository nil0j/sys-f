// globals //
let authorizationHeader = ""


window.onload = () => {
    // Pedimos a la API los libros actuales en base de datos
    fetchBooks();

    // Añadimos al botón de submit del formulario un listener para enlazarlo a la función createBook
    document.querySelector('#createButton').addEventListener('click', createBook);
}

async function fetchBooks() {
    let apiUrl = "http://localhost:5000/api/books";
    let res = await fetch(apiUrl);
    let books = await res.json();

    //Borramos el contenido de la tabla
    eraseTable();
    // Poblamos la tabla con el contenido del JSON
    updateTable(books);
}

function eraseTable() {
    // Accedemos a la lista de filas de la tabla <tr> y las borramos todas
    let filas = Array.from(document.querySelectorAll('tbody tr'));
    for (let fila of filas) {
        fila.remove();
    }
}

function updateTable(books) {
    let table = document.getElementById("book-table");

    // Iteramos books: por cada book
    for (let book of books) {
        // Creamos y añadimos a la tabla una nueva fila (<tr>)
        let row = document.createElement('tr');
        table.append(row);
        // Creamos y añadimos a la fila las celdas de id, título, autor, año, acciones.
        // Las celdas id, título, autor, año se deben rellenar con la info del JSON.
        // Las celdas título, autor, año deben tener el atributo contenteditable a true.
        let celdaId = document.createElement('td');
        celdaId.innerHTML = book.id;
        row.append(celdaId);
        let celdaTitulo = document.createElement('td');
        celdaTitulo.innerHTML = book.title;
        celdaTitulo.contentEditable = true;
        row.append(celdaTitulo);
        let celdaAutor = document.createElement('td');
        celdaAutor.innerHTML = book.author;
        celdaAutor.contentEditable = true;
        row.append(celdaAutor);
        let celdaAno = document.createElement('td');
        celdaAno.innerHTML = book.year;
        celdaAno.contentEditable = true;
        row.append(celdaAno);
        // Creamos dos botones (editar y eliminar) y los añadimos a la celda acciones.
        // Hay que añadir a cada botónn el listener correspondiente para enlazarlos a las funciones editBook i deleteBook, respectivamente.
        let celdaAcciones = document.createElement('td');
        row.append(celdaAcciones);
        let buttonEdit = document.createElement('button');
        buttonEdit.innerHTML = "Modificar";
        buttonEdit.addEventListener('click', editBook);
        celdaAcciones.append(buttonEdit);
        let buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = "Eliminar";
        buttonDelete.addEventListener('click', deleteBook);
        celdaAcciones.append(buttonDelete);
    }
}

async function deleteBook(event) {
    // Leemos el contenido de la columna id de esa fila
    let celdas = event.target.parentElement.parentElement.children;
    let id = celdas[0].innerHTML;
    // Hacemos la petición de DELETE a la API pasando un json en el cuerpo del mensaje
    let apiUrl = "http://localhost:5000/api/books";
    let deletedBook = {
        "id": id
    }

    console.log("Authorization: ", authorizationHeader)

    await fetch(apiUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorizationHeader,
        },
        body: JSON.stringify(deletedBook)
    });

    fetchBooks();
}

async function editBook(event) {
    // Leemos el contenido de las columnas id, título, autor, año de esa fila
    let celdas = event.target.parentElement.parentElement.children;
    let id = celdas[0].innerHTML;
    let titulo = celdas[1].innerHTML;
    let autor = celdas[2].innerHTML;
    let ano = celdas[3].innerHTML;

    // Hacemos la petición de PUT correspondiente pasando un json en el cuerpo del mensaje
    // p.ej. { "id": 1, "title": "titulo", "author": "autor", "year": 1980 }
    let apiUrl = "http://localhost:5000/api/books"
    let modifiedBook = {
        "id": id,
        "title": titulo,
        "author": autor,
        "year": ano
    }
    await fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorizationHeader,
        },
        body: JSON.stringify(modifiedBook)
    });

    fetchBooks();
}

async function createBook(event) {
    // Leemos el contenido del formulario: título, autor, año
    let titulo = document.querySelector("#book-title").value;
    let autor = document.querySelector("#book-author").value;
    let ano = document.querySelector("#book-year").value;

    // Hacemos la petición de POST correspondiente pasando un json en el cuerpo del mensaje
    // p.ej. { "title": "titulo", "author": "autor", "year": 1980 }
    // No añadir id, es autoincremental
    let apiUrl = "http://localhost:5000/api/books";

    let newBook = {
        title: titulo,
        author: autor,
        year: ano
    }

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorizationHeader,
        },
        body: JSON.stringify(newBook)
    });

    fetchBooks();
}



/// JWT ///
const lockIcon = {
    closed: "&#x1f512;",
    open: "&#x1f513;",
}

const lockButton = document.getElementById("lock")
const lockInput = document.getElementById("lock-input")
lockButton.addEventListener("click", triggerTokenPopup)

let tokenPopupOpen = true;

function triggerTokenPopup(_) {
    tokenPopupOpen ? closeTokenPopup() : openTokenPopup()
    tokenPopupOpen = !tokenPopupOpen
}

function closeTokenPopup() {
    lockButton.innerHTML = lockIcon.closed

    let token = lockInput.value
    authorizationHeader = `Bearer ${token}`
    lockInput.value = ""
    lockInput.style.visibility = "hidden"
    console.log(authorizationHeader)
}

function openTokenPopup() {
    lockButton.innerHTML = lockIcon.open
    lockInput.style.visibility = "visible"
    authorizationHeader = ""
}

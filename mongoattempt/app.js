const mongodb = require("mongodb");

require("mongodb").MongoClient
const url = "mongodb://localhost:27017"

client = new mongodb.MongoClient(url)


class Connection {

    async start() {
        await this.connect(client)

        const newBook = {
            title: "wee woo",
            author: "author",
            year: 32
        }
        await this.create(newBook)
        await this.list()

        await client.close()

    }

    async connect(client) {
        console.log("Attempting to connect to database")

        try {
            await client.connect()
            console.log("Connected to database")
        } catch (err) {
            console.log("Connection failed", err)
        }

        let db = await client.db("nyanko")
        let collection = await db.createCollection("books")
        this.connection = db
        this.collection = collection

        console.log("all good")
    }


    async create(newBook) {
        console.log("trying...")
        try {
            const results = await this.collection.insertOne(newBook);
            console.log("werks", results)
        }
        catch (err) {
            console.log(err)
        }
        // await this.connection.save(newBook)
    }

    async list() {
        try {
            await this.collection.find().forEach(a => {console.log("one", a)});
        } catch (error) {
            console.log(error);
        }
    }
}



let connect = new Connection();
connect.start()

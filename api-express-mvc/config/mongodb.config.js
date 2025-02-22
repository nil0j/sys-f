const mongodb = require("mongodb");

require("mongodb").MongoClient
const url = "mongodb://localhost:27017"

client = new mongodb.MongoClient(url)

async function connect(client) {
    console.log("Attempting to connect to database")

    try {
        await client.connect()
        console.log("Connected to database")
    } catch(err) {
        console.log("Connection failed", err)
    }

    let db = await client.db("nyanko")
    return await db.createCollection("books")
}

module.exports = {
    URL: "mongodb://localhost:27017",
    connect: connect,
};

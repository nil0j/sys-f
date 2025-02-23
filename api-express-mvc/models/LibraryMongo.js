const mongodb = require("mongodb");
const dbConfig = require("../config/mongodb.config.js");

class Library {
    constructor() {
    }

    close = () => {
        this.client.close();
    }

    listAll = async () => {
        this.client = new mongodb.MongoClient(dbConfig.URL)
        this.collection = await dbConfig.connect(client)

        try {
            let result = []
            await this.collection.find().forEach(a => {
                a.id = a._id.toString()
                result.push(a)
            });
            return result;
        } catch (error) {
            return error;
        }
    };

    create = async (newBook) => {
        this.client = new mongodb.MongoClient(dbConfig.URL)
        this.collection = await dbConfig.connect(client)

        try {
            await this.collection.insertOne(newBook);
            return true;
        } catch (error) {
            return error;
        }
    };

    update = async (id, newBook) => {
        this.client = new mongodb.MongoClient(dbConfig.URL)
        this.collection = await dbConfig.connect(client)

        try {
            const updatedData = {
                title: newBook.title,
                author: newBook.author,
                year: newBook.year
            };

            try {
            await this.collection.updateOne(
                {  _id: new mongodb.ObjectId(id) },
                { $set: updatedData },
            );
            } catch(e) {
                console.log(e)
            }

            return true;
        } catch (error) {
            return error;
        }
    };

    delete = async (id) => {
        this.client = new mongodb.MongoClient(dbConfig.URL)
        this.collection = await dbConfig.connect(client)
        try {
            let object_id = new mongodb.ObjectId(id)
            await this.collection.findOneAndDelete(
                { _id: object_id }
            );
            return;
        } catch (error) {
            return error;
        }
    };
}

module.exports = Library;

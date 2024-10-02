import {MongoClient as Mongo,Db } from 'mongodb'

export const MongoClient ={
    cliente: undefined as unknown as Mongo,
    db: undefined as unknown as Db,


    async connect(): Promise <void>{
        const url = process.env.MONGODB_URL || "localhost:8000";
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;

        const cliente = new Mongo(url, {auth: { username, password } });
        const db = cliente.db("users-db");

        this.cliente = cliente;
        this.db =db;

        console.log("connect to mongoDB")
    }
}
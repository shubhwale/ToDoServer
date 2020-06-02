import {MongoClient, ObjectId} from 'mongodb';

export class CrudManager {
    public static async create(inputObj: any) {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);
            const db = client.db('database-todo');
            await db.collection('tasks').insert(inputObj);
            client.close();
            return {opr : true};
        }
        catch(err){
            return {opr : false};
        } 
    }

    public static async read() {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);
            const db = client.db('database-todo');
            const output = await db.collection('tasks').find().sort({_id:-1}).toArray();
            client.close();
            return output;
        }
        catch(err){
            return {opr : false};
        }   
    }

    public static async update(inputObj: any) {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);
            const db = client.db('database-todo');
            const newData = {"$set" : {todo : inputObj.todo}};
            const query = {_id : new ObjectId(inputObj._id)};
            await db.collection('tasks').update(query,newData);
            client.close();
            return {opr : true};
        }
        catch(err){
            return {opr : false};
        }   
    }

    public static async delete(inputObj: any) {
        try {
            const url = 'mongodb://localhost:27017';
            const client = await MongoClient.connect(url);
            const db = client.db('database-todo');
            const query = {_id : new ObjectId(inputObj._id)};
            await db.collection('tasks').deleteOne(query);
            client.close();
            return {opr : true};
        }
        catch(err){
            return {opr : false};
        }
    }
}
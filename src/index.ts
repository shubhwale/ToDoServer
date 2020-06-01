//console.log("hello world");
import express from 'express';
import cors from 'cors';
import {CrudManager} from './crud.manager';

const app = express();

//middleware service :: allow ajax call
app.use(cors());

// helps to read the data in json format
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//will develop api here
app.get("/" , async(req,res)=>{
    //const output = { data : 'GET' }
    const output = await CrudManager.read();
    res.json(output);
})

app.post("/" , async (req,res)=>{
    const input = req.body;
    //const output = { data : 'POST' , todo : input.todo }

    const output = await CrudManager.create(input);
    res.json(output);
})

app.put("/" , async (req,res)=>{
    const input = req.body;
    //const output = { data : 'PUT', todo : input.todo }
    const output = await CrudManager.update(input);
    res.json(output);
})

app.delete("/" , async (req,res)=>{
    const input = req.body;
    //const output = { data : 'DELETE' , todo : input.todo }
    const output = await CrudManager.delete(input);
    res.json(output);
})

app.listen(3000,()=> {
    console.log('Server started');
})
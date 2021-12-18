const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpgnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("My project's Database Connected");
        const database = client.db("My_Projects");
        const projectsCollection = database.collection("Projects");

        app.get('/projects', async (req, res) => {
            const cursor = projectsCollection.find({});
            const allProjects = await cursor.toArray();
            res.json(allProjects);
        })


        app.post('/projects', async (req, res) => {
            const postProject = req.body;
            const result = await projectsCollection.insertOne(postProject);
            res.json(result);
        })

    }
    finally {
        // await clint.close();
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Murad's Portfolio Server");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

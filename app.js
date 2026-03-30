import express from 'express';
import path from 'path';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { MongoClient } from "mongodb";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const client = new MongoClient("mongodb://localhost:27017");

async function connectDB() {
    await client.connect();
    console.log("MongoDB connected");
}

connectDB();

const db = client.db("testDB");
const collection = db.collection("users");

app.post("/Tasks", async (req, res) => {
    const data = req.body;

    await collection.insertOne(data);

    res.redirect('/');
});

app.post("/option",async (req,res)=>{
    try{
        const query = req.body.query;
        const results = await collection.find({
            priority : query
        }).toArray();
        if(query === "All Priorities"){
            const usersto =  await db.collection('users').find().toArray();
            res.render("partials/tasklist.ejs",{users:usersto});
        }
        else{
            res.render("partials/tasklist.ejs",{users:results});
        }
        
    } catch(err){
        FontFaceSetLoadEvent.error(err);
        res.status(500).send("Server Error");
    }
})

app.post("/search", async (req, res) => {
    try {
        const query = req.body.query;

        const results = await collection.find({
            title: { $regex: query, $options: "i" }
        }).toArray();
        res.render("partials/tasklist.ejs", { users: results });

    } catch (err) {
        console.error(err);   // THIS will show real error
        res.status(500).send("Server Error");
    }
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/', async(req, res) => {
    // let todaytaskno = await db.collection('users').countDocuments({});
    // res.render('dashboard.ejs',{todaytaskno});
    const users =  await db.collection('users').find().toArray();
    const today = new Date();
    const dateOnly = today.toLocaleDateString('en-CA');
    res.render('dashboard.ejs',{currentpage: "dashboard",users,dateOnly});
});
app.get('/tasks',async(req,res)=>{
    const users =  await db.collection('users').find().toArray();
    res.render('Tasks.ejs',{currentpage : "Tasks",users});
});

app.get('/project',(req,res)=>{
    res.render('Projects.ejs',{currentpage : "project"});
})


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
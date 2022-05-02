const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middlewere
app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASS}@cluster0.37lyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// run function create
async function run() {
  try {
    await client.connect();
    console.log("connect to db");
    // client,db = database name && collection = database collection
    const productCollection = client.db("wereHouse").collection("products");
    app.post("/products", async (req, res) => {
      const result = await productCollection.insertOne(req.body);
      console.log(req.body);
      res.send(result);
      console.log(result);
    });
    // load all data
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    //load single data
    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
      // update data
    });
    app.post("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      // console.log(req);
      const filter = { _id: ObjectId(id) };
      // const options = {upsert : true};
      // const updatedDoc ={
      //   $set:{
      //     quantity : data.quantity
      //   },
      // }
      // const result = await productCollection.updateOne(filter,updatedDoc,options);
      // res.send(result)
      // console.log(data);
    });

    // add data 
    app.post(("/products", async (req, res) =>{
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result)
    }))
  } finally {
  }
}
// call run function
run().catch(console.dir);

// test server home route
app.get("/", (req, res) => {
  res.send("Server Conected . Test Done!!");
});
// listening port
app.listen(port, () => {
  console.log("Running Surver In", port);
});

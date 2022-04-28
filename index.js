const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middlewere
app.use(express.json());
app.use(cors());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASS}@cluster0.q72xb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

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
    console.log('connect to db');
    // client,db = database name && collection = database collection
    const productCollection = client.db("wereHouse").collection("products");

    // load all data
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    // //load single data
    // app.get("sproduct/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const product = await productCollection.findOne(query);
    //   res.send(product);
    // });
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

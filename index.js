// const express = require("express");
// const cors = require("cors");
// const app = express();
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const port = process.env.PORT || 5000;
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // middlewere
// app.use(express.json());
// app.use(cors());
// // function verifyJWT(req, res, next) {
// //   const authHeader = req.headers.authorization;
// //   if (!authHeader) {
// //     return res.status(401).send({ message: "unauthorized access" });
// //   }
// //   const token = authHeader.split(" ")[1];
// //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
// //     if (err) {
// //       return res.status(403).send({ message: "Forbidden access" });
// //     }
// //     req.decoded = decoded;
// //     next();
// //   });
// // }
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASS}@cluster0.37lyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// // run function create
// async function run() {
//   try {
//     await client.connect();
//     console.log("connect to db");
//     // client,db = database name && collection = database collection
//     const productCollection = client.db("wereHouse").collection("products");
//     const userCollection = client.db("wereHouse").collection("userItem");
//     app.post("/products", async (req, res) => {
//       const result = await productCollection.insertOne(req.body);
//       console.log(req.body);
//       res.send(result);
//       console.log(result);
//     });
//     // app.post("/login", async (req, res) => {
//     //   const user = req.body;
//     //   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//     //     expiresIn: "1d",
//     //   });
//     //   res.send({ accessToken });
//     // });
//     // load all data
//     app.get("/products", async (req, res) => {
//       const query = {};
//       const cursor = productCollection.find(query);
//       const products = await cursor.toArray();
//       res.send(products);
//     });
//     //load single data
//     app.get("/inventory/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const product = await productCollection.findOne(query);
//       res.send(product);
//       // update data
//     });
//     app.put("/inventory/:id", async (req, res) => {
//       const id = req.params.id;
//       const data = req.body;
//       // console.log(req);
//       console.log(data);
//       const filter = { _id: ObjectId(id) };
//       const options = { upsert: true };
//       const updatedDoc = {
//         $set: {
//           quantity: data.quantity,
//         },
//       };
//       const result = await productCollection.updateOne(
//         filter,
//         updatedDoc,
//         options
//       );
//       res.send(result);
//       console.log(data);
//     });
//     app.delete("/inventory/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await productCollection.deleteOne(query);
//       res.json(result);
//     });
//     // add data
//     app.post(
//       ("/products",
//       async (req, res) => {
//         const product = req.body;
//         const result = await productCollection.insertOne(product);
//         res.send(result);
//       })
//     );
//     // app.post(
//     //   ("/userItem",
//     //   async (req, res) => {
//     //     const product = req.body;
//     //     const result = await userCollection.insertOne(product);
//     //     res.send(result);
//     //   })
//     // );
//     // app.get()
//     // load user item

//     app.get("/products", async (req, res) => {
//       const email = req.query.email;
//       const query = { email: email };
//       console.log(query);
//       const cursor = productCollection.find(query);
//       const products = await cursor.toArray();
//       res.send(products);
//     });
//     // app.get("/myitems", async (req, res) => {
//     //   const email = req.query.email;
//     //   const query = { email: email };
//     //   console.log(query);
//     //   const cursor = productCollection.find(query);
//     //   const products = await cursor.toArray();
//     //   res.send(products);
//     // });
//   } finally {
//   }
// }
// // call run function
// run().catch(console.dir);

// // test server home route
// app.get("/", (req, res) => {
//   res.send("Server Conected . Test Done!!");
// });
// // listening port
// app.listen(port, () => {
//   console.log("Running Surver In", port);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// middlewere
app.use(express.json());
app.use(cors());
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}
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
    app.post("/login", async (req, res) => {
      const user = req.body;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken });
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
    app.put("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      // console.log(req);
      console.log(data);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: data.quantity,
        },
      };
      const result = await productCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
      console.log(data);
    });
    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.json(result);
    });
    // add data
    app.post(
      ("/products",
      async (req, res) => {
        const product = req.body;
        const result = await productCollection.insertOne(product);
        res.send(result);
      })
    );
    // load user item

    app.get("/user-item", verifyJWT, async (req, res) => {
      const decodedEmail = req.decoded.email;
      const email = req.query.email;
      if (email === decodedEmail) {
        const query = { email: email };
        const cursor = productCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
      } else {
        res.status(403).send({ message: "forbidden access" });
      }
    });

    // app.get("/user-item/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const product = await productCollection.findOne(query);
    //   res.send(product);
    //   // update data
    // });

    // app.delete("/user-item/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await productCollection.deleteOne(query);
    //   res.json(result);
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

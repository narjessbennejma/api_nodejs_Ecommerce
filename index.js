const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/authRoute");

const catRoute = require("./routes/categoryRout");
const prodRout = require("./routes/produitRout");
//const router = require("./routes/categoryRout");
//const req = require("express/lib/request");
const contactRout =require("./routes/contactRout");
const panRoute = require ("./routes/cartRout");

app.listen(3000, () => {
    console.log("app started on port 3000");
 
})


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
 app.use(express.json(), cors());
   require("./middleware/db");
 app.use("/api/auth", authRoute);
 app.use("/api/category", catRoute);
 app.use("/api/produit",prodRout);
 app.use('/uploads', express.static('uploads'));
 app.use('/api/cart', panRoute);
 app.use("/api/contact",contactRout);

  
  
  
  

  
  


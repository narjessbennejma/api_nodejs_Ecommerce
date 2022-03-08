var express = require('express');
const produit = require('../models/produit');
var router = express.Router();
const Produit = require("../models/produit");
const multer= require("../image");

router.post("/saveProduit", multer.upload.single('image'),(req, res) => {
  const produit = new Produit({
    category:req.body.category,
    nom:req.body.nom,
    description:req.body.description,
    prix:req.body.prix,
    disponible:req.body.disponible,
    image:req.file.path,
   
  });
  console.log(produit);

  produit.save((err, newProduit) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      produit: newProduit,
    });
  });
});
//Get
router.get("/getProduit", (req, res) => {
  Produit.find()
    .then(list => res.status(200).json(list))
    .catch(err => console.log(error()))
})
//delete
router.delete("/delete/:id", (req,res) => {
  Produit.findOneAndDelete({ _id: req.params.id })
        .then((produit) => {
            res.status(200).send(produit)
        })
        .catch((error) => { console.log(error) });
})


//update
router.put("/update/:id", (req, res) => {
  Produit.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((produit) => {
      res.status(200).send(produit)
    })
    .catch((error) => { console.log(error) });
})

router.get("/get/:id", (req, res) => {
  //let productId = req.params.productId;
  Produit.findById({ _id: req.params.id })
      .then((produit) => {
          res.status(200).send(produit)
      })
      .catch((error) => { console.log(error) });
}
);
module.exports = router;
var express = require('express');
var router = express.Router();
const Category = require("../models/category");

//Add a new Category
router.post("/saveCategory",(req, res) => {
    const category = new Category({
      name: req.body.name,
      status: req.body.status
    })

    category.save((err, newCategory) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          err,
        });
      }
  
      res.status(201).json({
        ok: true,
        category: newCategory,
      });
    });
  });

 router.get("/getCategory", (req, res) => {
  Category.find()
  .then(list => res.status(200).json(list))
  .catch(err => console.log(error()))
})
//delete
router.delete("/delete/:id", (req,res) => {
  Category.findOneAndDelete({ _id: req.params.id })
        .then((category) => {
            res.status(200).send(category)
        })
        .catch((error) => { console.log(error) });
})


//update
router.put("/update/:id", (req, res) => {
  Category.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((category) => {
      res.status(200).send(category)
    })
    .catch((error) => { console.log(error) });
})

module.exports = router;
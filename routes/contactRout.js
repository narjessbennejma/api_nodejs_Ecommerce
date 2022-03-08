var express = require('express');
var router = express.Router();
const  Contact = require("../models/contact");


router.post('/sendMessage', async (req, res) => {
  
  const newContact = new Contact({
      nom: req.body.nom,
      email: req.body.email,
      message:req.body.message
    });
  await newContact.save();

  res.status(200).json("contact ajouté avec succès");
});

//get 
router.get("/getContact", (req, res) => {
  Contact.find()
  .then(list => res.status(200).json(list))
  .catch(err => console.log(error()));
}) 
//delete
router.delete("/delete/:id", (req,res) => {
  Contact.findOneAndDelete({ _id: req.params.id })
        .then((contact) => {
            res.status(200).send(contact)
        })
        .catch((error) => { console.log(error) });
})
module.exports = router;
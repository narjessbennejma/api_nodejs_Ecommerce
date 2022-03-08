const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


router.post("/signup",  async (req, res) => {
    //checking if user email already exixts
    const loginExist = await User.findOne({login: req.body.login });
    if(loginExist) {
        res.status(400).send("Login already exists");
        return;
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //on process of adding new user
    const user = new User({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        login:req.body.login,
        password: hashedPassword,
        role:req.body.role,
        phone:req.body.phone,
        adresse:req.body.adresse
        
    });
    const saveUser = await user.save();
    res.status(200).send("user created");
    res.json(saveUser);   
    
});
router.get("/getUser", (req, res) => {
  User.find()
    .then(list => res.status(200).json(list))
    .catch(err => console.log(error()))
})
//signin
router.post("/signin", async (req, res) => {
    User.findOne({ login: req.body.login })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }
    /* User.compare(req.body.role , user.role)
     .then(roles => {
      if (!roles) {
        return res.status(401).json({ error: 'Role not found!' });
      }*/
     
      
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Wrong password !' });
          }
          res.status(200).json({
            user,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET'
            )
          });
          /*res.status(200).json({
            user,
            token: jwt.sign({
              data: user.id,
              role: user.role
          }, secret)          
          });*/
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  })
  /*.catch(error => res.status(500).json({ error }));
});
router.get("/users",   authorize(Role.Admin), async (req, res) => {
  User.find()
  .then( user =>  res.status(200).json(user))
  .catch(error => res.status(500).json({ error}))
});*/
module.exports = router;


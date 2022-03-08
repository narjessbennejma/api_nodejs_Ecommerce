const mongoose =require ("mongoose");
//creation d'un objet mongoose
const contact= new mongoose.Schema({
    nom:{type :String ,required: true,min:3,max:9},
    email:{type :String ,required: true ,min:6,max:20},
    message:{type :String ,required: true,min:3,max:255},
   
});
module.exports= mongoose.model("Contact",contact);
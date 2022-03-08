var mongoose = require('mongoose')

var Schema = mongoose.Schema; 

var produitSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},

    image:{
       type : String,
        
       },
    nom:{
        type : String,
         require : true
         },
         
    description:{
        type : String,
         require : true

    },
    prix:{
        type : Number,
        require : true
    },
    disponible:{
        type : Boolean,
        require : true

    },
    
})
module.exports = mongoose.model('Produit',produitSchema )
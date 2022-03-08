const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
    },
    quantite: {
        type: Number,
        required: true,
        min: [1, 'La quantité ne peut pas être inférieure à 1.']
    },
    prix: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Panier', CartSchema);
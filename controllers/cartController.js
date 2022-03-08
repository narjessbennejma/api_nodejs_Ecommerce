const Cart = require("../models/cart");
const Produit = require("../models/produit");
const cartRepository = require("../repository/cartRepository")


exports.addItemToCart = async (req, res) => {
    const {
        produitId
    } = req.body;
    const quantite = Number.parseInt(req.body.quantite);
    try {
        let cart = await cartRepository.cart();
        let produitDetails = await Produit.findById(produitId);
             if (!produitDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----
        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.items.findIndex(item => item.produitId.id == produitId);
            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantite <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {
                cart.items[indexFound].quantite = cart.items[indexFound].quantite + quantite;
                cart.items[indexFound].total = cart.items[indexFound].quantite * produitDetails.prix;
                cart.items[indexFound].prix = produitDetails.prix
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----Check if quantity is greater than 0 then add item to items array ----
            else if (quantite > 0) {
                cart.items.push({
                    produitId: produitId,
                    quantite: quantite,
                    prix: produitDetails.prix,
                    total: parseInt(produitDetails.prix * quantite)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {
            const cartData = {
                items: [{
                    produitId: produitId,
                    quantite: quantite,
                    total: parseInt(produitDetails.prix * quantite),
                    prix: produitDetails.prix
                }],
                subTotal: parseInt(produitDetails.prix * quantite)
            }
            cart = await cartRepository.addItem(cartData)
            // let data = await cart.save();
            res.json(cart);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.emptyCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
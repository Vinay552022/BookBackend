const express = require('express');
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
module.exports.deleteCartController = async (req, res) => {
    try {
        const { email,userType,bookId } = req.params;
        var user;
        if (userType === "BHMSstudent") {
            user = await BHMS.findOne({ email });
        } else if (userType === "HomeopathicDoctor") {
            user = await HomeopathicDoctor.findOne({ email });
        } else {
            user = await GeneralIndividual.findOne({ email });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartItemIndex = -1;
        if (user.cart) {
            cartItemIndex = user.cart.findIndex(item => item.bookId == bookId);
        }
        console.log("cartItemIndex",cartItemIndex)
        if (cartItemIndex !== -1) {
            user.cart.splice(cartItemIndex,1);
        }

        await user.save();
        return res.status(200).json({ message: "Cart item deleted" });
    } catch (error) {
        console.error('Cart deleting error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

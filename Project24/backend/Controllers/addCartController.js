const express = require('express');
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
module.exports.addCartController = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { userType, email, count } = req.body;
        let user;
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
            cartItemIndex = user.cart.findIndex(item => item.bookId === bookId);
        }

        if (cartItemIndex === -1) {
            user.cart.push({ bookId, quantity: count });
        } else {
            user.cart[cartItemIndex].quantity = count;
        }

        await user.save();
        return res.status(200).json({ message: "Cart item quantity updated" });
    } catch (error) {
        console.error('Cart adding error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

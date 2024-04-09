const express = require('express');
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
const Book = require('../Models/book');
const order = require('../Models/order');

module.exports.getCartController = async (req, res) => {
    try {
        const { email, userType } = req.params;
        let user;
        if(userType=='Admin'){
            const allBooks = await Book.find({});
            const orders = await order.find();
            return res.status(200).json({
                success: true,
                message: "Succesfully retrieved books",
                allBooks:allBooks,
                orders:orders

            });
        }
        else if (userType === "BHMSstudent") {
            user = await BHMS.findOne({ email });
        } else if (userType === "HomeopathicDoctor") {
            user = await HomeopathicDoctor.findOne({ email });
        } else {
            user = await GeneralIndividual.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const allBooks = await Book.find({});
        const cartItems = user.cart.map(item => ({
            bookId: item.bookId,
            quantity: item.quantity
        }));
        
        const booksInCart = cartItems.map(cartItem => {
            const bookDetails = allBooks.find(book => book.bookId === cartItem.bookId);
            return {
                ...bookDetails.toObject(), 
                quantity: cartItem.quantity
            };
        });
        console.log(booksInCart);
        const orders = await order.find({ email: email });
        const booksMap = new Map(allBooks.map(book => [book.bookId, book]));

        // Process each order
        const finalOrders = orders.map(singleOrder => {
            // Process each item in the order
            const itemsWithBookDetails = singleOrder.items.map(item => {
                // Find book details using the bookId from the item
                const bookDetails = booksMap.get(item.bookId);
                // Return the item with book details merged
                return {
                    ...item.toObject(), // Convert Mongoose document to plain object
                    book: bookDetails ? bookDetails.toObject() : null // Include book details if found, otherwise null
                };
            });
            // Return the order with items containing book details
            return {
                ...singleOrder.toObject(), // Convert Mongoose document to plain object
                items: itemsWithBookDetails
            };
        });

        console.log( finalOrders);
        return res.status(200).json({
            success: true,
            message: "Books found in cart",
            booksInCart: booksInCart,
            allBooks:allBooks,
            finalOrders:finalOrders

        });
    } catch (error) {
        throw new Error(error.message);
    }
};

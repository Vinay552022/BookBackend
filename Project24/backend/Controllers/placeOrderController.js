const Order = require("../Models/order");
const Book = require("../Models/book");
const BHMS = require("../Models/bhmsStudent");
const GeneralIndividual = require("../Models/generalIndividual");
const HomeopathicDoctor = require("../Models/homeopathicDoctor");

module.exports.placeOrderController = async (req, res) => {
  const { email, userType, items, totalAmount } = req.body;
  console.log(userType,"popop")
  try {
    const allBooks = await Book.find({});

    const newOrder = new Order({
      email,
      userType,
      items,
      totalAmount
    });

    newOrder.items.forEach(async item => {
      const bookIndex = allBooks.findIndex(book => book.bookId === item.bookId);
      if (bookIndex !== -1) { // Book found
        allBooks[bookIndex].sell_count += 1;
        allBooks[bookIndex].selledPriceTotal += item.quantity * item.price;
        await allBooks[bookIndex].save(); // Save the updated book
      }
    });

    // Save the order
    const placedOrder = await newOrder.save();

    if (placedOrder) {
      // Empty the cart after placing the order
      let user;
      switch (userType) {
        case 'BHMSstudent':
          user = await BHMS.findOne({ email });
          break;
        case 'HomeopathicDoctor':
          user = await HomeopathicDoctor.findOne({ email });
          break;
        default:
          user = await GeneralIndividual.findOne({ email });      }
      if (user) {
        user.cart = []; // Set cart to an empty array
        await user.save(); // Save the updated user
      }
      res.status(201).json({ message: 'Order placed successfully' });
    } else {
      // Error saving the order
      res.status(500).json({ message: 'Error placing order' });
    }
  } catch (error) {
    console.error('Error placing order', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
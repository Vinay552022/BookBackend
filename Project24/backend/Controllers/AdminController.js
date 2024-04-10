const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
const User = require('../Models/userModel');
const Book = require('../Models/book')
const Order = require('../Models/order')

// Function to fetch user data based on email addresses from usersAdded array in admin schema
const fetchUserData = async (adminEmail) => {
    try {
        // Fetch admin data
        const admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            throw new Error('Admin not found');
        }
        // Fetch users from BHMS model
        const bhmsUsers = await BHMS.find({ email: { $in: admin.usersAdded } });

        // Fetch users from GeneralIndividual model
        const generalIndividualUsers = await GeneralIndividual.find({ email: { $in: admin.usersAdded } });

        // Fetch users from HomeopathicDoctor model
        const homeopathicDoctorUsers = await HomeopathicDoctor.find({ email: { $in: admin.usersAdded } });

        return { bhmsUsers, generalIndividualUsers, homeopathicDoctorUsers };
    } catch (error) {
        throw new Error('Error fetching user data: ' + error.message);
    }
};

// Controller function to get user data from usersAdded array of admin schema
module.exports.getAdminRegisteredUsers = async (req, res) => {
    try {
        const { adminEmail } = req.body; // Assuming admin email is sent in the request body

        // Fetch user data based on admin's email
        const userData = await fetchUserData(adminEmail);

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getBooks = async (req, res) => {
    try {
        console.log("hello", Book)
        const books = await Book.find({});
        console.log(books)
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.getOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();
        // Send the orders to the client
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports.buyBooks = async (req, res) => {
    const { email, userType } = req.body.userData;
    const {email:adminEmail}=req.body.adminData;
    const {bookId}=req.body.booksData[0]
    console.log(req.body.booksData,req.body.userdata,req.body.adminData,req.body.data,bookId)
    const {totalPrice,
        paymentMethod,
        quantity}=req.body.data
    console.log(userType,"popop")
    try {
      const allBooks = await Book.find({});
        const items=[{bookId,quantity,price:totalPrice}]
      const newOrder = new Order({
        email,
        userType,
        items,
        totalAmount:totalPrice,
        placedBy:adminEmail
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
  
      
    } catch (error) {
      console.error('Error placing order', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

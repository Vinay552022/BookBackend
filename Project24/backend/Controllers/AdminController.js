const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
const User = require('../Models/userModel');
const Book=require('../Models/book')
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

module.exports.getBooks=async (req,res)=>{
    try {
        console.log("hello",Book)
        const books = await Book.find({});
        console.log(books)
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
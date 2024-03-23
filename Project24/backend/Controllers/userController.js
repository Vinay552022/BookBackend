// Import required models
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');

// Define the endpoint for fetching user data based on user type
module.exports.getUserDataByType = async (req, res) => {
    try {
        const bhmsData = await BHMS.find().select('-password -_id');
        const generalIndividualData = await GeneralIndividual.find().select('-password -_id');
        const homeopathicDoctorData = await HomeopathicDoctor.find().select('-password -_id');

        const allUserData = {
            BHMSstudent: bhmsData,
            GeneralIndividual: generalIndividualData,
            HomeopathicDoctor: homeopathicDoctorData
        };

        res.status(200).json(allUserData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

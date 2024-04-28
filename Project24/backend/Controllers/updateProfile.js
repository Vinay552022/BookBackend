const express = require('express');
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
// Registration endpoint
module.exports.updateProfile = async (req, res) => {
    try {
        const userData = req.body;
        const { email, userType } = userData;
        console.log("userDta",userData)
        // Check if email or phone number already exists in all collections
        let user;
        if (userType === "BHMSstudent") {
            user = await BHMS.findOne({ email });
        } else if (userType === "HomeopathicDoctor") {
            user = await HomeopathicDoctor.findOne({ email });
        } else {
            user = await GeneralIndividual.findOne({ email });
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract fields to update, excluding cart, email, phoneNumber, and name
        const { cart, phoneNumber, name, ...updatedUserData } = userData;

        // Update user profile
        user.set(updatedUserData);
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

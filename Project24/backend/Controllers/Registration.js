const express = require('express');
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
const User=require('../Models/userModel')
// Registration endpoint
module.exports.userRegistration = async (req, res) => {
    try {
        const userData = req.body;

        // Check if email or phone number already exists in all collections
        const [bhmsUser, homeopathicDoctorUser, generalIndividualUser] = await Promise.all([
            BHMS.findOne({ $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }] }),
            HomeopathicDoctor.findOne({ $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }] }),
            GeneralIndividual.findOne({ $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }] })
        ]);

        // Check if user exists in any of the collections
        if (bhmsUser || homeopathicDoctorUser || generalIndividualUser) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        // If user doesn't exist in any collection, proceed with registration
        if (userData.userType === 'BHMSstudent') {
            
                const newUser = new BHMS(userData);
                await newUser.save();
        } else if (userData.userType === 'HomeopathicDoctor') {
            if(userData.qualification=="BHMS"){
                const {speciality,...data}=userData
                const newUser = new HomeopathicDoctor(data);
                await newUser.save();
            }
            else{
                const newUser = new HomeopathicDoctor(userData);
                await newUser.save();
            }
            
        } else {
            if(userData.qualification=="BHMS"){
                console.log(userData)
                const {speciality,...data}=userData
                
                const newUser = new GeneralIndividual(data);
                await newUser.save();
            }
            else{
                const newUser = new GeneralIndividual(userData);
                await newUser.save();
            }
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.userRegistrationByAdmin = async (req, res) => {
    try {
        const userData = req.body;

        // Check if email or phone number already exists in all collections
        const [bhmsUser, homeopathicDoctorUser, generalIndividualUser] = await Promise.all([
            BHMS.findOne({ $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }] }),
            HomeopathicDoctor.findOne({ $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }] }),
            GeneralIndividual.findOne({ $or: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }] })
        ]);

        // Check if user exists in any of the collections
        if (bhmsUser || homeopathicDoctorUser || generalIndividualUser) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        // If user doesn't exist in any collection, proceed with registration
        let newUser;
        if (userData.userType === 'BHMSstudent') {
            newUser = new BHMS(userData);
        } else if (userData.userType === 'HomeopathicDoctor') {
            if (userData.qualification == "BHMS") {
                const { speciality, ...data } = userData;
                newUser = new HomeopathicDoctor(data);
            } else {
                newUser = new HomeopathicDoctor(userData);
            }
        } else {
            if (userData.qualification == "BHMS") {
                const { speciality, ...data } = userData;
                newUser = new GeneralIndividual(data);
            } else {
                newUser = new GeneralIndividual(userData);
            }
        }

        await newUser.save();

        // Add the email of the registered user to the adminsAdded array in the User model
        const adminUser = await User.findOneAndUpdate(
            { userType: "Admin" },
            { $push: { usersAdded: newUser.email } },
            { new: true }
        );

        res.status(201).json({ message: 'User registered successfully', adminUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

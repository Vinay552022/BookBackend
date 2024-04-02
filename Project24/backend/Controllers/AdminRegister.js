const express = require("express");

const bcrypt = require("bcryptjs");
const User = require('../Models/userModel'); // Assuming your schema is defined in a file named User.js

// Endpoint for admin registration
module.exports.registerAdmin=async (req, res) => {
  try {
    
    const { username, email, password, registeringAdminEmail } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }


    // Create a new admin user
    
    const newUser = new User({
      username,
      email,
      password,
      userType: "Admin", // Assuming all registered users through this endpoint are admins
    });

    // Save the new admin user to the database
    await newUser.save();

    // Find the registering admin
    const registeringAdmin = await User.findOne({ email: registeringAdminEmail });
    if (!registeringAdmin) {
      return res.status(404).json({ success: false, message: "Registering admin not found" });
    }

    // Update the registering admin's document to include the email of the newly registered admin
    registeringAdmin.adminsAdded.push(email);
    await registeringAdmin.save();

    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error occurred during admin registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


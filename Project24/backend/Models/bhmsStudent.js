const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    currentYear: {
        type: String,
        required: true
    },
    currentAddress: {
        lane1: {
            type: String,
            required: true
        },
        lane2: String,
        pincode: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        }
    },
    residentialAddress: {
        lane1: {
            type: String,
            required: true
        },
        lane2: String,
        pincode: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        }
    },
    alternatePhoneNumber: {
        type: String
        
    }
});

// Middleware to hash the password before saving
userSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (error) {
        next(error);
    }
});

const BHMS = mongoose.model("BHMS", userSchema, "BHMSstudent");

module.exports = BHMS;

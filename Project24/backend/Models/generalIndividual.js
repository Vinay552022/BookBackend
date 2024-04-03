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
    institute: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: function() {
            return this.qualification === "MD";
        }
    },
    registrationNumber: {
        type: String,
        required: true
    },
    countryRegisteredWith: {
        type: String,
        required: true
    },
    registeredCouncil: {
        type: String,
        required: true
    },
    currentJob: {
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
            type: String
           
        },
        city: {
            type: String
        
        },
        country: {
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
            type: String
            
        },
        city: {
            type: String
            
        },
        country: {
            type: String,
            required: true
        }
    },
    alternatePhoneNumber: {
        type: String
    },cart: [{
        bookId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    opinion:{
        type:String,
        default:""
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

const GeneralIndividual = mongoose.model("GeneralIndividual", userSchema, "GeneralIndividual");

module.exports = GeneralIndividual;

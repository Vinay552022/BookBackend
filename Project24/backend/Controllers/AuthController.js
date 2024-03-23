const User = require("../Models/userModel");
const { createSecretToken } = require("../util/SecretToken");
const BHMS = require('../Models/bhmsStudent');
const GeneralIndividual = require('../Models/generalIndividual');
const HomeopathicDoctor = require('../Models/homeopathicDoctor');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        console.log(err)
          return res.json({ status: false });
      } else {
          try {
              const [admin, bhmsUser, homeopathicDoctorUser, generalIndividualUser] = await Promise.all([
                  User.findById(data.id),
                  BHMS.findById(data.id),
                  HomeopathicDoctor.findById(data.id),
                  GeneralIndividual.findById(data.id)
              ]);

              let user;
              let userType;

              if (admin) {
                  user = admin;
                  userType = 'admin';
              } else if (bhmsUser) {
                  user = bhmsUser;
                  userType = 'BHMS student';
              } else if (homeopathicDoctorUser) {
                  user = homeopathicDoctorUser;
                  userType = 'Homeopathic doctor';
              } else if (generalIndividualUser) {
                  user = generalIndividualUser;
                  userType = 'General individual';
              } else {
                  return res.json({ status: false });
              }
              const userData = { ...user.toObject(), password: undefined };
              if (user) {
                  return res.json({ status: true, user:userData });
              } else {
                  return res.json({ status: false });
              }
          } catch (error) {
              console.error(error);
              return res.json({ status: false });
          }
      }
  });
};


module.exports.Login = async (req, res, next) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      const [admin, bhmsUser, homeopathicDoctorUser, generalIndividualUser] = await Promise.all([
          User.findOne({ email }),
          BHMS.findOne({ email }),
          HomeopathicDoctor.findOne({ email }),
          GeneralIndividual.findOne({ email })
      ]);

      let user;
      let userType;

      if (admin) {
          user = admin;
          userType = 'admin';
      } else if (bhmsUser) {
          user = bhmsUser;
          userType = 'BHMS student';
      } else if (homeopathicDoctorUser) {
          user = homeopathicDoctorUser;
          userType = 'Homeopathic doctor';
      } else if (generalIndividualUser) {
          user = generalIndividualUser;
          userType = 'General individual';
      } else {
          return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
          return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const token = createSecretToken(user._id);

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      res.cookie("token", token, { expires: expiryDate });
      const userData = { ...user.toObject(), password: undefined };

      res.status(200).json({ message: "User logged in successfully", success: true, user: userData });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
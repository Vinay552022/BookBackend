const Order = require("../Models/order");
const Book = require("../Models/book");
const BHMS = require("../Models/bhmsStudent");
const GeneralIndividual = require("../Models/generalIndividual");
const HomeopathicDoctor = require("../Models/homeopathicDoctor");
require("dotenv").config();

const axios = require("axios");
const crypto = require("crypto");

const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const merchant_id = "PGTESTPAYUAT";

module.exports.placeOrderController = async (req, res) => {
  try {
    const { email, userType, items, totalAmount } = req.body;

    const allBooks = await Book.find({});

    const newOrder = new Order({
      email,
      userType,
      items,
      totalAmount
    });

    await newOrder.save(); // Save the order first to ensure consistency

    for (const item of newOrder.items) {
      const book = allBooks.find(book => book.bookId === item.bookId);
      if (book) {
        book.sell_count += 1;
        book.selledPriceTotal += item.quantity * item.price;
        await book.save();
      }
    }

    let user;
    switch (userType) {
      case 'BHMSstudent':
        user = await BHMS.findOne({ email });
        break;
      case 'GeneralIndividual':
        user = await GeneralIndividual.findOne({ email });
        break;
      case 'HomeopathicDoctor':
        user = await HomeopathicDoctor.findOne({ email });
        break;
      default:
        throw new Error('Invalid user type');
    }

    if (user) {
      const merchantTransactionId = req.body.transactionId;
      const data = {
        merchantId: merchant_id,
        merchantTransactionId,
        merchantUserId: req.body.MUID,
        email: req.body.email,
        amount: req.body.totalAmount * 100,
        redirectUrl: `http://localhost:3000/status/?id=${merchantTransactionId}`,
        redirectMode: 'POST',
        mobileNumber: req.body.phoneNumber,
        paymentInstrument: {
          type: 'PAY_PAGE'
        }
      };

      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString('base64');
      const string = `${payloadMain}/pg/v1/pay${salt_key}`;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const checksum = `${sha256}###1`;

      const options = {
        method: 'POST',
        url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum
        },
        data: {
          request: payloadMain
        }
      };
      axios.request(options).then(async function (response) {
        console.log(response.data)
        user.cart = [];
        await user.save();
        return res.json(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });  
    }

  } catch (error) {
    console.error('Error placing order', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.paymentStatus = async (req, res) => {
  try {
    const merchantTransactionId = req.query.id;
    const merchantId = merchant_id;
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}${salt_key}`;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = `${sha256}###${keyIndex}`;

    const options = {
      method: 'GET',
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
      }
    };

    const response = await axios.request(options);
    if (response.data.success === true) {
      return res.redirect('http://localhost:3000/success');
    } else {
      return res.redirect('http://localhost:3000/failure');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// 
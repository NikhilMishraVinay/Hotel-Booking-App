import User from "../models/user";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import crypto from 'crypto';
//import Stripe from "stripe";
//import queryString from "query-string";

//const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).exec();

    if (!user.stripe_account_id) {
      user.stripe_account_id = req.body;
      await user.save();
      console.log("USER ==> ", user);
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripe_account_id: user.stripe_account_id,

      });
    }
    return res.status(400).send("You have alreary submitted")
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to fetch")
  }

};


export const getAccountStatus = async (req, res) => {
  try {
    //for getting data imediate after updating pass {new:true}
    //selecting everything except password
    const user = await User.findByIdAndUpdate(req.auth._id, {
      stripe_seller: { "enable": true }
    },
      { new: true }
    ).select("-password").exec();
    //const user = await User.findByIdAndUpdate(req.auth._id).exec();

    return res.json({ user });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    return res.status(400).send("Signin failed");
  }
};


export const getAccountBalance = async (req, res) => {
  try {
    //for getting data imediate after updating pass {new:true}
    //selecting everything except password
    const user = await User.findById(req.auth._id).exec();
    //here we need to fetch balance of account from rozarpay using stripe_account_id
    const account_id = user.stripe_account_id;
    const balance = 50;
    return res.json({ balance });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    return res.status(400).send("Signin failed");
  }
}

export const Order = async (req, res) => {
  try {
    console.log("..here")
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}

export const verify = async (req, res) => {
	try {
    console.log("verify.....")
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}



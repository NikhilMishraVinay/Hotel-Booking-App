import express from "express";

const router = express.Router();

import {Order, verify} from '../controllers/stripe';

// middleware
import { requireSignin } from "../middlewares";
// controllers
import { createConnectAccount, getAccountStatus, getAccountBalance } from "../controllers/stripe";

router.post("/create-connect-account", requireSignin, createConnectAccount);

router.post("/get-account-status", requireSignin, getAccountStatus);

router.post("/get-account-balance",requireSignin, getAccountBalance)

router.post("/make-orders", Order)
router.post("/verify", verify)


module.exports = router;

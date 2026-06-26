import express from "express";

import loginRoute from "./login.js";
import createAccountRoute from "./createAccount.js";

const router = express.Router();

router.use(loginRoute);
router.use(createAccountRoute);

export default router;

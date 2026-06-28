import express from "express";

import findMe from "./me.js";
import loginRoute from "./auth/login.js";
import createAccountRoute from "./auth/createAccount.js";

const router = express.Router();

router.use(loginRoute);
router.use(createAccountRoute);
router.use(findMe);

export default router;

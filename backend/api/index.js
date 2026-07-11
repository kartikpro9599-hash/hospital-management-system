import express from "express";

import findMe from "./me.js";
import loginRoute from "./auth/login.js";
import createAccountRoute from "./auth/createAccount.js";

const apiRoutes = express.Router();

apiRoutes.use(loginRoute);
apiRoutes.use(createAccountRoute);
apiRoutes.use(findMe);

export default apiRoutes;

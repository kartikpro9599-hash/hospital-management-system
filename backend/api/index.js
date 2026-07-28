import express from "express";

import findMe from "./me.js";
import loginRoute from "./auth/login.js";
import createAccountRoute from "./auth/createAccount.js";
import logoutRoute from "./logout.js";

const apiRoutes = express.Router();

apiRoutes.use(loginRoute);
apiRoutes.use(createAccountRoute);
apiRoutes.use(findMe);
apiRoutes.use(logoutRoute);

export default apiRoutes;

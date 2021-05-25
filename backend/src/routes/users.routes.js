import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/users.controller";
import { authJwt } from "../middlewares/index";

router.get("/", authJwt.verifyToken, usersCtrl.getUsers);
router.post(
  "/",
  authJwt.verifyToken,
  [authJwt.checkDuplicateUsernameorEmail],
  usersCtrl.createUser
);

router.get("/:id", authJwt.verifyToken, usersCtrl.getUser);
router.put("/:id", authJwt.verifyToken, usersCtrl.updateUser);
router.delete("/:id", [authJwt.verifyToken], usersCtrl.deleteUser);
router.put("/change-status/:id", [authJwt.verifyToken], usersCtrl.changeStatus);

export default router;

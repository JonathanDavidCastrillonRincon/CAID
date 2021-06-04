import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/users.controller";
import { authJwt } from "../middlewares/index";

router.get("/", authJwt.verifyToken, usersCtrl.getUsers);
router.post(
  "/",
  authJwt.verifyToken,
  [authJwt.checkDuplicateEmail],
  usersCtrl.createUser
);

router.post("/recover-password", usersCtrl.resetPassword);
router.post("/new-password/:token", usersCtrl.newPassword);
router.get("/:id", authJwt.verifyToken, usersCtrl.getUser);
router.put("/:id", authJwt.verifyToken, usersCtrl.updateUser);
router.delete("/:id", [authJwt.verifyToken], usersCtrl.deleteUser);
router.put("/change-status/:id", [authJwt.verifyToken], usersCtrl.changeStatus);
router.put(
  "/change-password/:id",
  [authJwt.verifyToken],
  usersCtrl.changePassword
);

export default router;

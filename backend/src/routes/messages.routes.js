import { Router } from "express";
const router = Router();

import * as messagesCtrl from "../controllers/messages.controller";
import { authJwt } from "../middlewares/index";

router.get("/", authJwt.verifyToken, messagesCtrl.getMessages);
router.post("/", authJwt.verifyToken, messagesCtrl.createMessage);

router.get("/:id", authJwt.verifyToken, messagesCtrl.getMessage);
router.put("/:id", authJwt.verifyToken, messagesCtrl.updateMessage);
router.put(
  "/change-status/:id",
  authJwt.verifyToken,
  messagesCtrl.changeStatusToRemove
);
router.delete("/:id", authJwt.verifyToken, messagesCtrl.deleteMessage);
router.get("/to/:query", authJwt.verifyToken, messagesCtrl.searchByTo);
router.get(
  "/postedBy/:query",
  authJwt.verifyToken,
  messagesCtrl.searchByPostedBy
);

export default router;
import { Router } from "express";
const router = Router();

import * as postsCtrl from "../controllers/posts.controller";

import { authJwt } from "../middlewares/index";

router.get("/", postsCtrl.getPosts);
router.post("/", authJwt.verifyToken, postsCtrl.createPost);

router.get("/:id", postsCtrl.getPost);
router.put("/:id", authJwt.verifyToken, postsCtrl.updatePost);
router.delete("/:id", authJwt.verifyToken, postsCtrl.deletePost);
router.post("/file-update/:id", authJwt.verifyToken, postsCtrl.updateFile);
router.post(
  "/upload-evidences/:id",
  authJwt.verifyToken,
  postsCtrl.uploadEvidence
);
router.get("/get-file/:file", postsCtrl.getFile);
router.get("/get-files/:files", postsCtrl.getFileEvidence);

export default router;

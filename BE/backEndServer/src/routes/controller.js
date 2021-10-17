import express from "express";
import home from "./user_manage/home.js";
import product from "./product_manage/product.js";
import admin from "./admin_manage/admin.js";
import freeboard from "./freeboard_manage/freeboard.js";
import notice from "./notice_manage/notice.js";
import cart from "./cart_manage/cart.js";
import * as HttpError from "./error_handler.js";

var router = express.Router();

//home으로 이동
router.use("/home", home);
router.use("/product", product);
router.use("/admin", admin);
router.use("/freeboard", freeboard);
router.use("/notice", notice);
router.use("/cart", cart);
router.use("/*", HttpError.badRequest);

//dummy data 추가하는 코드

export default router;

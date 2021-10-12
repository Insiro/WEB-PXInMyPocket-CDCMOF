import express from "express";
import crypto from "crypto";
import { badRequest } from "../error_handler.js";
import { checkSigned } from "../middleWare.js";
import { getUser } from "../utills.js";
import db from "../../models/Index.js";

var router = express.Router();

//로그인을 하지 않은 상태로 /user로 접속하면 403 error를 보냅니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
//로그인 한 후 접근 가능 하도록 middle ware 을 설정합니다.
router.all("/*", checkSigned);

router.all("/", badRequest);

//POST home/user/order-arrive 해당유저의 도착한 제품 보내줍니다.
router.get("/order-arrive", async (req, res) => {
  let loginUser = await getUser(req.session.user.email);
  db.Order.findAll({
    where: {
      arrived: true,
    },
  })
    .then((items) => {
      res.status(200).json({ data: items });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "failed to road prodlist" });
    });
});

//POST home/user/delete-order 확인한 주문목록을 삭제합니다.
router.get("/delete-order", async (req, res) => {
  db.Order.destroy({
    where: {
      order_id: req.body.order_id,
    },
  })
    .then(() => {
      res.status(200).json({ deleteSuccess: true });
    })
    .catch(() => {
      res.status(200).json({ deleteSuccess: false });
    });
});

//GET home/user/orderlist 해당유저가 주문한 목록을 보여줍니다.
router.get("/orderlist", async (req, res) => {
  try {
    let loginUser = await getUser(req.session.user.email);
    let items = loginUser.getOrders();
    res.status(200).json({ data: items });
    console.log("주문목록페이지");
  } catch (error) {
    res.status(400).json({ error: "failed to load" });
  }
});

//POST home/

//POST home/user/change-userinfo: 개인 정보 수정내역을 보냅니다
router.post("/change-userinfo", async (req, res) => {
  var new_password = req.body.newpassword;
  try {
    let loginUser = await getUser(req.session.user.email);
    var salt = loginUser.salt;
    var hashPassword = crypto
      .createHash("sha512")
      .update(new_password + salt)
      .digest("hex");
    loginUser.update({
      password: hashPassword,
      serial_number: req.body.new_serial_number,
      expire_date: req.body.new_expire_date,
    });
    res.status(200).json({ changeInfoSuccess: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ changeInfoSuccess: false });
  }
});

// GET home/user/mypost
// 해당유저가 작성한 게시물들 정보를 보내줌
router.get("/mypost", async (req, res) => {
  try {
    let loginUser = await getUser(req.session.user.email);
    loginUser.getPosts().then((posts) => {
      res.status(200).json({ data: posts });
    });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
  console.log("작성글목록페이지");
});
router.all("/*", badRequest);
export default router;

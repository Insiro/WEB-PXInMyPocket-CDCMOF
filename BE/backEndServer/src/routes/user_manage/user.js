import express from "express";
import crypto from "crypto";
import { badRequest } from "../error_handler.js";
import { checkSigned } from "../middleWare.js";

var router = express.Router();
var loginUser;

//로그인을 하지 않은 상태로 /user로 접속하면 403 error를 보냅니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
//로그인 한 후 접근 가능 하도록 middle ware 을 설정합니다.
router.use("/*", checkSigned);

router.all("/", badRequest);

//GET home/user/orderlist 해당유저가 주문한 목록을 보여줍니다.
router.get("/orderlist", (req, res) => {
  console.log("주문목록페이지");
  console.log(loginUser);
  loginUser.getOrders().then((items) => {
    res.send(items);
  });
});

//POST home/user/change-userinfo: 개인 정보 수정내역을 보냅니다
router.post("/change-userinfo", (req, res) => {
  var new_password = req.body.newpassword;
  var check_password = req.body.checkpassword;
  if (new_password === check_password) {
    var salt = loginUser.salt;
    var hashPassword = crypto
      .createHash("sha512")
      .update(new_password + salt)
      .digest("hex");

    loginUser.update({
      password: hashPassword,
    });

    if (!req.body.new_serial_number)
      loginUser.update({
        serial_number: req.body.new_serial_number,
      });

    if (!req.body.new_expire_date)
      loginUser.update({
        expire_date: req.body.new_expire_date,
      });
  } else {
    res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
  }
});

// GET home/user/mypost
// 해당유저가 작성한 게시물들 정보를 보내줌
router.get("/mypost", (req, res) => {
  console.log("작성글목록페이지");
  loginUser.getPosts().then((posts) => {
    res.status(200).send(posts);
  });
});
router.all("/*", badRequest);
export default router;

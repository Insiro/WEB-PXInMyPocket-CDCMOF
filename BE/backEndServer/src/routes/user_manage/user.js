import express from "express";
import db from "../../models/Index.js";
import crypto from "crypto";

var router = express.Router();
var loginUser;

//로그인을 하지 않은 상태로 /user로 접속하면 403 error를 보냅니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
router.all("/", (req, res, next) => {
  console.log("/home/user get에 들어감");
  if (!req.session.user) {
    console.log("로그인이 유효하지 않습니다");
    res.status(403).send();
  } else {
    //session 내용의 유저를 User 변수로 함
    db.User.findOne({
      where: { id: req.session.user.id },
    }).then((selectedUser) => {
      loginUser = selectedUser;
      console.log(
        "로그인 성공 후 user 페이지에 들어갔습니다 선택된 유저는:",
        loginUser.id
      );
      res.send(loginUser.id);
    });
    next();
  }
});

//home/user: 프론트 페이지가 필요합니다. 버튼을 통해 주문목록, 개인정보 수정, 내 게시글에 접속할 수 있습니다.
router.get("/", function (req, res) {
  console.log("home/user로 접속하였습니다.");
});

//GET home/user/orderlist 해당유저가 주문한 목록을 보여줍니다.
router.get("/orderlist", (req, res) => {
  console.log("주문목록페이지");
  console.log(loginUser);
  loginUser.getOrders().then((items) => {
    console.log(items);
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
    res.send("비밀번호가 서로 일치하지 않습니다.");
  }
});

// GET home/user/mypost
// 해당유저가 작성한 게시물들 정보를 보내줌
router.get("/mypost", (req, res) => {
  console.log("작성글목록페이지");
  loginUser.getPosts().then((posts) => {
    res.send(posts);
  });
});

export default router;

// </home/*> 에서는 로그인과 회원가입, 비밀번호 찾기, 유저정보를 담당합니다.
import express from "express";
import crypto from "crypto";
import db from "../../models/Index.js";
import register from "./register.js";
import finduser from "./finduser.js";
import user from "./user.js";
import * as HttpError from "../error_handler.js";
var router = express.Router();

//not allowd api
router.get("/", HttpError.badRequest);

//FE에 세션에 대한 정보를 알려주기 위한 부분입니다.
router.all("/signed", (req, res) => {
  res.status(200).json({ value: req.session.user.authorized === true });
});
router.all("/authority-check", (req, res) => {
  res.status(200).send(req.session.user.authority);
});

// POST home/login
// 로그인 기능입니다. login은 home페이지를 통해 가능합니다. 로그인이 성공하면 /home/user로 이동합니다.

router.post("/login", (req, res) => {
  console.log("login check");
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      var inputPassword = req.body.password;
      var salt = user.salt;
      var hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");

      if (user.password != hashPassword) {
        console.log("로그인 실패!");
        return res.status(402).json({ result: "fail" });
      } else {
        console.log("로그인 성공!");
        req.session.user = {
          email: user.email,
          name: user.name,
          authority: user.authority,
          authorized: true,
        };
        res.status(202).json({ result: "success", name: user.name });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(402).json({ result: "fail" });
    });
});

// GET home/logout
// 로그아웃 기능입니다. 세션을 삭제하고 로그아웃합니다. 204 코드를 반환합니다
router.get("/logout", async (req, res) => {
  console.log("/process/logout 호출됨");
  if (req.session.user) {
    console.log("로그아웃");
    await req.session.destroy();
  }
  res.status(204).send();
});

// register와 finduser, user는 페이지가 따로 존재합니다.
router.use("/register", register);
router.use("/finduser", finduser);
router.use("/user", user);
router.use("/*", HttpError.badRequest);

export default router;

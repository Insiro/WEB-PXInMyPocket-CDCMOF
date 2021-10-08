// /home/register 페이지는 회원가입 기능을 담당합니다.
// front페이지를 만들어 주세요.
import express from "express";
import db from "../../models/Index.js";
import crypto from "crypto";
import { notAcceptable } from "../error_handler.js";

var router = express.Router();

//POST home/register: 회원가입 기능입니다
router.post("/", (req, res) => {
  var inputPassword = req.body.password;
  var salt = Math.round(new Date().valueOf() * Math.random()) + "";
  var hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
  console.log(req.body.id, req.body.password);

  db.User.create({
    id: req.body.id,
    password: hashPassword,
    salt: salt,
    name: req.body.name,
    email: req.body.email,
    serial_number: req.body.serial_number,
    expire_date: req.body.expire_date,
    rank: req.body.rank,
  })
    .then(() => {
      res.status(202).json({ result: "success" });
      console.log("user create success");
    })
    .catch((err) => {
      console.log("user create fail");
      console.log(err);
      //TODO: set masage to show why failed to create account
      res.status(406).json({ result: "failed", message: "" });
    });
});

router.get("/", notAcceptable);

export default router;

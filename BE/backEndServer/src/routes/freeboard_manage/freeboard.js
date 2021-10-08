// </freeboard/*> 에서는 게시판 글쓰기 기능을 제공합니다.
import express from "express";
var router = express.Router();
import db from "../../models/Index.js";
import { notFound } from "../error_handler.js";
import { checkSigned } from "../middleWare.js";

router.use("/*", checkSigned);
router.use("/", checkSigned);
// POST /freeboard/
// 게시글을 생성합니다.
router.post("/", function (req, res) {
  var title = req.body.title;
  var content = req.body.content;

  console.log(req.session.user.email);
  //TODO: check why not work as String len is over 50char when under 50chars
  db.Post.create({
    writer: req.session.user.email,
    title: title,
    content: content,
  })
    .then((post) => {
      res.status(202).json(post);
      console.log("posting success", post);
    })
    .catch((err) => {
      console.log("order fail");
      console.log(err);
      res.status(400).json({ error: "failed" });
    });
});

// GET /freeboard/detailview?post_id=32423423
// 해당 게시글 페이지를 보내줍니다.
router.get("/detailview", (req, res) => {
  var post_id = req.query.post_id;
  db.Post.findAll({
    where: {
      post_id: post_id,
    },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.error(err);
      notFound(req, res);
    });
});

// GET freeboard/delete/detailview?post_id=23423
// 게시글을 삭제합니다.
router.get("/delete/detailview", (req, res) => {
  console.log("작성글을 제거합니다.");
  db.Post.destroy({
    where: { post_id: req.query.post_id },
  });
  res.status(202).json({ result: "success" });
});

// POST freeboard/edit/detailview?post_id=
// 게시글을 수정합니다.
router.post("/edit/detailview", (req, res) => {
  var post_id = req.query.post_id;
  var title = req.body.title;
  var content = req.body.content;

  db.Post.update(
    {
      title: title,
      content: content,
    },
    {
      where: { post_id: post_id },
    }
  );

  console.log("게시글 수정 완료");
  res.status(202).send("success");
});

export default router;

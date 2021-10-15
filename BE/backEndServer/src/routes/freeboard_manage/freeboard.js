// </freeboard/*> 에서는 게시판 글쓰기 기능을 제공합니다.
import express from "express";
var router = express.Router();
import db from "../../models/Index.js";
import { notFound, badRequest } from "../error_handler.js";
import { checkSigned } from "../middleWare.js";

//router.post("/", checkSigned);

//GET freeboard/announcemet
//공지 게시글을 가져옵니다.
router.get("/announcement", (req, res) => {
  db.Post.findAll({
    where: {
      announcement: true,
    },
  })
    .then((items) => {
      res.status(200).json(items);
      console.log(items);
    })
    .catch((err) => {
      console.error(err);
    });
});

// POST /freeboard/
// 게시글을 생성합니다.
router.post("/", async (req, res) => {
  var title = req.body.title;
  var content = req.body.content;
  var announcemet = req.body.isNotic;
  try {
    announcemet =
      announcemet === undefined || announcemet === null ? false : announcemet;
    if (announcemet) {
      const loginUser = await db.User.findOne({
        where: { email: req.session.user.email },
      });
      announcemet = loginUser.authority === true;
    }
    //TODO: check why not work as String len is over 50char when under 50chars
    await db.Post.create({
      writer: req.session.user.email,
      title: title,
      content: content,
      announcement: announcemet,
    });
    res.status(202).send("success");
  } catch (e) {
    console.log(e);
    console.log("order fail");
    res.status(400).json({ error: "failed" });
  }
});

router.get("/list", (req, res) => {
  db.Post.findAll()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.error(err);
      notFound(req, res);
    });
});
// GET /freeboard?post_id=32423423
// 해당 게시글 페이지를 보내줍니다.
router.use("/", (req, res) => {
  var post_id = req.query.post_id;
  db.Post.findOne({
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
router.delete("/", checkSigned);
router.delete("/", (req, res) => {
  console.log("작성글을 제거합니다.");
  db.Post.destroy({
    where: { post_id: req.query.post_id },
  });
  res.status(202).json({ result: "success" });
});

// POST freeboard/edit/detailview?post_id=
// 게시글을 수정합니다.
router.use("/edit_post", checkSigned);
router.post("/edit_post", (req, res) => {
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
router.all("/*", badRequest);
export default router;

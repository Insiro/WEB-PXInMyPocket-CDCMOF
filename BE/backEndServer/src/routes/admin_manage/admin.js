// admin 페이지에서는 관리자 권한은 가진 유저가 물품정보를 수정할 수 있습니다.
import express from "express";
const router = express.Router();
import db from "../../models/Index.js";
import { checkAdmin, checkSigned } from "../middleWare.js";
import { badRequest } from "../error_handler.js";

router.use("/", checkSigned);
router.use("/", checkAdmin);
router.use("/*", checkSigned);
router.use("/*", checkAdmin);
// POST /admin/add-product
// 새로운 재고를 추가합니다.
router.post("/add-product", function (req, res) {
  const product_name = req.body.product_name;
  const remaining = req.body.remaining;
  const price = req.body.price;
  const limit_item = req.body.limit_item;
  const category = req.body.category;

  console.log(req.session.user.email);
  db.Product.create({
    product_name: product_name,
    remaining: remaining,
    price: price,
    limit_item: limit_item,
    category: category,
  })
    .then((item) => {
      res.status(202).send("success");
      console.log("add product success", item);
    })
    .catch((err) => {
      res.status(400).send("failed");
      console.log("add product fail");
      console.log(err);
    });
});

// POST /admin/modify-product
// 재고수량, 가격을 변경합니다.
router.post("/modify-product", function (req, res) {
  const remaining = req.body.remaining;
  const price = req.body.price;
  const limit_item = req.body.limit_item;
  const category = req.body.category;

  db.Product.findOne({
    where: {
      product_id: req.query.id,
    },
  }).then((product) => {
    product
      .update({
        remaining: remaining,
        price: price,
        limit_item: limit_item,
        category: category,
      })
      .then((item) => {
        res.status(202).json({ result: "success" });
        console.log("modify product success", item);
      })
      .catch((err) => {
        res.status(400).send("failed");
        console.log("modify product fail");
        console.log(err);
      });
  });
});

// POST /admin/delete-product
// 해당물품을 삭제합니다.
router.post("/delete-product", (req, res) => {
  console.log("해당물품을 제거합니다.");
  db.Product.destroy({
    where: {
      product_id: req.query.id,
    },
  });
  res.status(202).send("success");
});

// GET /admin/sell?product_name=초코파이
// pos기에서 물품이 해당 부분이 실행되고 물품의 수량변화가 일어남
router.get("/sell", (req, res) => {
  console.log("제품이 하나 팔림");
  db.Product.findOne({
    where: {
      product_id: req.query.id,
    },
  }).then((foundProduct) => {
    const remaining = foundProduct.remaining - 1;
    const weekly_sale = foundProduct.weekly_sale + 1;
    const monthly_sale = foundProduct.monthly_sale + 1;
    foundProduct.update({
      remaining: remaining,
      weekly_sale: weekly_sale,
      monthly_sale: monthly_sale,
    });
    res.status(200).send(foundProduct);
  });
});

//POST /admin/set-announcement
// 해당 게시물을 공지 게시글로 설정합니다.
router.get("/set-announcement", (req, res) => {
  db.Post.findOne({
    where: {
      post_id: req.body.post_id,
    },
  }).then((post) => {
    post
      .update({
        announcement: true,
      })
      .then((item) => {
        res.status(202).json({ result: true });
        console.log("set announcement success", item);
      })
      .catch((err) => {
        res.status(400).send("failed");
        console.log("set announcement fail");
        console.log(err);
      });
  });
});
router.all("/*", badRequest);
export default router;

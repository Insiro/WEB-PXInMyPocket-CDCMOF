// </product/*> 에서는 물품정보를 제공하고 주문기능을 수행합니다.
import express from "express";
var router = express.Router();
import Sequelize from "sequelize";
import db from "../../models/Index.js";
import order from "./order.js";
import preference from "./preference.js";
import * as HttpError from "../error_handler.js";
//주문에 대한 내용은 order.js에서 처리
router.use("/order", order);

//선호도 관련 페이지는 preference.js에서 처리
router.use("/preference", preference);

// GET /product
// 로그인을 하지 않은 상태로 /product로 접속하면 403 error를 보냅니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
// /product페이지에 들어가면 전체 상품 정보를 가져옵니다.
router.get("/", async (req, res) => {
  try {
    const items = await db.Product.findAll();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ error: "server error on load data" });
  }
});

// GET /product/category?kinds=liquor
// 카테고리별로 상품을 가져옵니다. 카테고리를 query.kinds를 통해 구분합니다.
router.get("/category", function (req, res) {
  db.Product.findAll({
    where: {
      category: req.query.kinds,
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

// GET /product/all-category
// Products의 카테고리 속성을 중복 없이 가져옴
router.get("/all-category", function (req, res) {
  db.Product.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
    ],
  }).then((category) => {
    res.status(200).send(category);
  });
});

// GET /product/info-by-name?name=초코파이
// 해당상품의 정보를 name을 통해 가져옴
router.get("/info-by-name", function (req, res) {
  db.Product.findOne({
    where: {
      product_name: req.query.name,
    },
  })
    .then((items) => {
      res.status(200).json({ data: items });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "not found Item" });
    });
});
//GET /product/info-by-id?id=234-123-4321
//해당상품에 대한 정보를 id를 통해 가져옴
router.get("/info-by-id", async (req, res) => {
  try {
    const item = await db.Product.findOne({
      where: {
        product_id: req.query.id,
      },
    });
    if (item) res.status(200).json({ data: item });
    else HttpError.notFound(req, res);
  } catch (e) {
    res.status(400).json({ error: "failed" });
  }
});
router.all("/*", HttpError.badRequest);
export default router;

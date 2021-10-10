// admin 페이지에서는 관리자 권한은 가진 유저가 물품정보를 수정할 수 있습니다.
import express from "express";
var router = express.Router();
import db from "../../models/Index.js";
import { checkAdmin, checkSigned } from "../middleWare.js";
import { badRequest } from "../error_handler.js";

//admin이 아니라면 user 페이지로 이동 시킵니다.
router.use("/", checkSigned);
router.use("/", checkAdmin);

// POST /admin/add-product
// 새로운 재고를 추가합니다.
router.post("/add-product", function (req, res) {
  var product_name = req.body.product_name;
  var remaining = req.body.remaining;
  var price = req.body.price;
  var limit_item = req.body.limit_item;
  var category = req.body.category;

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
  var product_name = req.body.product_name;
  var remaining = req.body.remaining;
  var price = req.body.price;
  var limit_item = req.body.limit_item;
  var category = req.body.category;

  db.Product.findOne({
    where: {
      name: product_name,
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
  var product_name = req.body.product_name;
  db.Product.destroy({ 
	  where: {
	  product_name : product_name, 
  	}
  });
  res.status(202).send("success");
});

// GET /admin/sell?product_name=초코파이
// pos기에서 물품이 해당 부분이 실행되고 물품의 수량변화가 일어남
router.get("/sell", (req, res) => {
  console.log("제품이 하나 팔림");
  var product_name = req.query.product_name;
  db.Product.findOne({
    where: {
      product_name: product_name,
    },
  }).then((foundProduct) => {
    var remaining = foundProduct.remaining - 1;
    var weekly_sale = foundProduct.weekly_sale + 1;
    var monthly_sale = foundProduct.monthly_sale + 1;
    foundProduct.update({
      remaining: remaining,
      weekly_sale: weekly_sale,
      monthly_sale: monthly_sale,
    });
    res.status(200).send(foundProduct);
  });
});

router.all("/*", badRequest);
export default router;

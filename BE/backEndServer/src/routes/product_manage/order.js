import express from "express";
var router = express.Router();
import db from "../../models/Index.js";
import { checkSigned } from "../middleWare.js";
import { badRequest } from "../error_handler.js";

router.use("/", checkSigned);

//POST /product/order/info
//주문자 아이디와 주문번호를 보내주면 해당하는 상품 주문 정보를 보내줍니다.
router.post("/info", function (req, res) {
  console.log(req.session.user.email);
  db.Order.findOne({
    where: {
      orderer_id: req.session.user.email,
      order_id: req.body.order_id,
    },
  })
    .then((item) => {
      res.status(202).json({ data: item });
      console.log("sending order info success", item);
    })
    .catch((err) => {
      res.status(406).json({ error: "failed to send order info" });
      console.log(err);
    });
});

//물품을 주문예약 시킴 /product/order?kind=snack&name=초코파이&price=1000
router.post("/", function (req, res) {
  var product_name = req.query.name;
  var quantity = req.body.quantity;
  var price = req.query.price;

  console.log(req.session.user.email);
  db.Order.create({
    orderer_id: req.session.user.email,
    product_name: product_name,
    quantity: quantity,
    price: price,
  })
    .then((item) => {
      res.status(202).json({ data: item });
      console.log("order success", item);
    })
    .catch((err) => {
      res.status(406).json({ error: "failed to order" });
      console.log("order fail");
      console.log(err);
    });
});

//delete /product_name
router.delete("/", (req, res) => {
  db.Order.delete({
    where: {
      order_id: req.body.order_id,
    },
  })
    .then(() => {
      res.status(200).json({ deleteSuccess: true });
    })
    .catch((err) => {
      res.status(406).json({ error: "failed to delete" });
      console.log(err);
    });
});
router.all("/*", badRequest);
export default router;

import express from "express";
var router = express.Router();
import db from "../../models/Index.js";
import { checkSigned } from "../middleWare.js";

router.use("/", checkSigned);
//물품을 주문예약 시킴 /product/order?kind=snack&name=초코파이&price=1000
router.post("/", function (req, res) {
  var product_name = req.query.name;
  var quantity = req.body.quantity;
  var price = req.query.price;

  console.log(req.session.user.id);
  db.Order.create({
    orderer_id: req.session.user.id,
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

export default router;

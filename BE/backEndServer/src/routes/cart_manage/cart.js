// </product/*> 에서는 물품정보를 제공하고 주문기능을 수행합니다.
import express from "express";
var router = express.Router();
import Sequelize from "sequelize";
import db from "../../models/Index.js";
import { checkSigned } from "../middleWare.js";
import { badRequest } from "../error_handler.js";

router.use("/", checkSigned);
// GET /cart
// 현재 로그인 되어있는 유저정보의 장바구니 아이템들을 보냅니다.
router.get("/", async (req, res) => {
  try {
    db.Cart.findAll({
      where: {
        owner_id: req.session.user.email,
      },
    }).then((items) => {
      res.status(200).json({ data: items });
    });
  } catch (error) {
    res.status(500).json({ error: "server error on load data" });
  }
});

// POST /cart
// 장바구니에 물품을 추가합니다.
router.post("/", async (req, res) => {
  db.Cart.create({
    quantity: req.body.quantity,
    added_product_id: req.body.added_product_id,
    owner_email: req.session.user.email,
	total_price: req.body.total_price,
  })
    .then(() => {
      res.status(200).json({ createSuccess: true });
    })
    .catch(() => {
      res.status(200).json({ createSuccess: false });
    });
});

router.all("/*", badRequest);
export default router;

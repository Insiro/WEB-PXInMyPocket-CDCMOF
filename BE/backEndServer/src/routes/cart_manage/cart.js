// </product/*> 에서는 물품정보를 제공하고 주문기능을 수행합니다.
import express from "express";
var router = express.Router();
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
        owner_email: req.session.user.email,
      },
    }).then((items) => {
      console.log(items.length);
      console.log(items[0].added_product_id);
      for (let i = 0; i < items.length; i++) {
        db.Product.findOne({
          where: {
            product_id: items[i].added_product_id,
          },
        })
          .then((item2) => {
            res.status(200).json({ data: items[i], info: item2 });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "matching product not found" });
          });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "matching cart_id is not found" });
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

// DELETE /cart
// 장바구니에 물품을 삭제합니다.
router.delete("/", async (req, res) => {
  db.Cart.destory({
    where: {
      cart_id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).json({ deleteSuccess: true });
    })
    .catch(() => {
      res.status(200).json({ deleteSuccess: false });
    });
});

// POST /cart/edit
router.post("/edit", async (req, res) => {
  db.Cart.findOne({
    where: {
      cart_id: req.body.id,
    },
  })
    .then((item) => {
      item
        .update({
          quantity: req.body.quantity,
        })
        .then(() => {
          res.status(200).json({ editSuccess: true });
        })
        .catch((err) => {
          res.status(200).json({ editSuccess: false });
        });
    })
    .catch((err) => {
      res.status(200).json({ findSuccess: false });
    });
});
router.all("/*", badRequest);
export default router;

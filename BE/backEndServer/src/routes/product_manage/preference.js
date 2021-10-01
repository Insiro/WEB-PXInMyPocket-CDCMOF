import express from "express";
var router = express.Router();
import db from "../../models/Index.js";

//주간, 월간단위 물품에 대한 선호 물품을 30개 보여줍니다.
//GET /product/preference?duration=weekly_sale(montyhly_sale)
router.get("/", function (req, res) {
  console.log("선호도 페이지입니다.");
  var duration = req.query.duration;
  db.Product.findAll({ order: [[duration, "DESC"]] }).then((foundItems) => {
    res.send(foundItems);
  });
});

export default router;

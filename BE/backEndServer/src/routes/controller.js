import express from "express";
import home from "./user_manage/home.js";
import product from "./product_manage/product.js";
import admin from "./admin_manage/admin.js";
import freeboard from "./freeboard_manage/freeboard.js";
import notice from "./notice_manage/notice.js";
import cart from "./cart_manage/cart.js";
import * as HttpError from "./error_handler.js";
import db from "../models/Index.js";
import crypto from "crypto";

var router = express.Router();


//--------------dummy data 추가하는 코드-------------//

async function createDB() {
//관리자 계정을 생성하는 코드 
//email: admin@admin.com  
//pw: cdcmof
var salt = Math.round(new Date().valueOf() * Math.random()) + "";
  var hashPassword = crypto
    .createHash("sha512")
    .update("cdcmof" + salt)
    .digest("hex");
	
	db.User.create({
		email: "admin@admin.com",
	    password: hashPassword,
	    salt: salt,
   	 	name: "admin",
   	 	serial_number: "21-11111111",
    	expire_date: "2021-01-01",
		authority: 1,
    	rank: true,
	})
	
//나머지를 생성하는 코드
for(let i = 0; i < 5; i++){
  //User를 추가하는 코드
  var email = "abc" + 0 + "@sample.com";
  var salt = Math.round(new Date().valueOf() * Math.random()) + "";
  var hashPassword = crypto
    .createHash("sha512")
    .update("cdcmof" + salt)
    .digest("hex");
	
	db.User.create({
		email: "abc" + i + "@sample.com",
	    password: hashPassword,
	    salt: salt,
   	 	name: "name" + i,
   	 	serial_number: "21-0000000" + i,
    	expire_date: "2021-01-01",
    	rank: false,
	})
	
	//Product를 추가하는 코드
	var product_name = "sample_product" + i;
	var category = null;
	var price = 3000;
	if(i % 3 == 0)
		category = "snack";
	else if(i % 3 == 1)
		category = "frozen";
	else
		category = "liquor"
	var created_product = await db.Product.create({
		product_name: product_name,
		remaining: i,
		price: price,
		limit_item: 1,
		category: category
	})
	//Post를 추가하는 코드
	db.Post.create({
      writer: email,
      title: "this is " + i + "th post",
      content: "content",
      announcement: false,
    });
	
	//Order를 추가하는 코드
	var created_order = await db.Order.create({
    orderer_id: email,
    product_name: product_name,
    quantity: i,
    price: price,
  })
console.log(created_order);
console.log(created_product);

	//Notice를 추가하는 코드
	var order_id = created_order.order_id;
	db.Notice.create({
    product_name: product_name,
    owner_id: email,
    order_id: order_id,
  })
	
	//Cart를 추가하는 코드
	var added_product_id = created_product.product_id;
	db.Cart.create({
    quantity: 10,
    added_product_id: added_product_id,
    owner_email: email,
    total_price: price * 10,
  })
}
}
var IsCreated = true;
router.get("/createDB", async (res,req) => {
	await createDB();
})

//--------------dummy data 추가하는 코드-------------//






//home으로 이동
router.use("/home", home);
router.use("/product", product);
router.use("/admin", admin);
router.use("/freeboard", freeboard);
router.use("/notice", notice);
router.use("/cart", cart);
router.use("/*", HttpError.badRequest);

export default router;

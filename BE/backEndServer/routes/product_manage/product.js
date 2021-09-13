import express from 'express';
var router = express.Router();
import db from '../../models/Index.js'
const Product = db.Product;

// 전체 상품을 가져옴
router.get('/', (req, res, next) => {
	Product.findAll()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

//카테고리별로 상품을 가져옴 /category?kinds=liquor
router.get('/category', function (req, res, next) {
	Product.findAll({
		where: {
			category: req.query.kinds,
		},
	})
		.then((items) => {
			res.json(items);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

//해당상품을 클릭하였을 때 /product/item?productcode=234324 
router.get('/item', function (req, res, next) {
	Product.findAll({
		where: {
			category: req.query.productcode,
		},
	})
		.then((items) => {
			res.json(items);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

//물품을 주문예약 시킴 /product/order?kind=snack&name=초코파이&
router.post('/order', function (req, res, next) {
	var product_name = req.q.password;
	var salt = Math.round((new Date().valueOf() * Math.random())) + "";
	var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
	console.log(req.body.id, req.body.password);
	
	db.User.create({
		id: req.body.id,
		password: hashPassword,
		salt: salt,
		name: req.body.name,
		email: req.body.email,
		serial_number: req.body.serial_number,
		expire_date: req.body.expire_date,
		rank: req.body.rank,
	})
	.then((items) => {
		res.json(items);
		console.log('user create success');
	})
	.catch((err) => {
		console.log('user create fail');
		console.log(err);
		
	})
	
	
	Product.findAll({
		where: {
			category: req.query.kinds,
		},
	})
		.then((items) => {
			res.json(items);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

//
export default router;

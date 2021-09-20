import express from 'express';
var router = express.Router();
import db from '../../models/Index.js'
const User = db.User;
const Product = db.Product;

//admin이 아니라면 user 페이지로 이동 시킵니다.
router.all('/', (req, res, next) => {
	console.log('admin page에 들어감');
	console.log(req.session.user)
	if (!req.session.user) {
		console.log(req.session.user);
		res.redirect('/home');
	}
	//session 내용의 유저를 User 변수로 함, authority가 1이면 관리자 권한

	User.findOne({
		where: {id: req.session.user.id}
	})
	.then((selectedUser) => {
		var loginUser = selectedUser;
		console.log("로그인 성공  선택된 유저는:", loginUser.id);
		if(!loginUser.authority){
			res.redirect('/home/user');
		} else {
			res.send('관리자권한 페이지 입니다.');
		}

	})
	.catch((err) => {
		res.redirect('/home');
		console.log(err);
	})

});

//물품을 주문예약 시킴 /admin/add-product
router.post('/add-product', function (req, res, next) {
	var product_name = req.body.product_name;
	var remaining = req.body.remaining;
	var price = req.body.price;
	var limit_item = req.body.limit_item;
	var category = req.body.category;

    console.log(req.session.user.id);
	db.Product.create({
		product_name: product_name,
		remaining: remaining,
		price: price,
		limit_item: limit_item,
		category: category,
	})
	.then((item) => {
		res.json(item);
		console.log('add product success', item);
	})
	.catch((err) => {
		console.log('add product fail');
		console.log(err);
	})
	

});

export default router;

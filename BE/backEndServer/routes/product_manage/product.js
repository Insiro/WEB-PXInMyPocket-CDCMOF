import express from 'express';
var router = express.Router();
import db from '../../models/Index.js'
const Product = db.Product;
import order from './order.js';



//로그인을 하지 않은 상태로 /product로 접속하면 /home으로 돌아가게 됩니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
router.all('/', (req, res, next) => {
	console.log('get에 들어감');
	console.log(req.session.user)
	if (!req.session.user) {
		console.log(req.session.user);
		res.redirect('/home');
	}
	//session 내용의 유저를 User 변수로 함

	User.findOne({
		where: {id: req.session.user.id}
	})
	.then((selectedUser) => {
		loginUser = selectedUser;
		console.log("로그인 성공 후 user 페이지에 들어갔습니다 선택된 유저는:", loginUser.id);
	})
});

//주문에 대한 내용은 order.js에서 처리
router.use('/order', order);


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

//해당상품을 클릭하였을 때 /product/item?name=초코파이  해당상품에 대한 정보를 가져옴
router.get('/item', function (req, res, next) {
	Product.findAll({
		where: {
			product_name: req.query.name,
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

//
export default router;

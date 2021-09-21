// </product/*> 에서는 물품정보를 제공하고 주문기능을 수행합니다. 
import express from 'express';
var router = express.Router();
import db from '../../models/Index.js'
import order from './order.js';


//주문에 대한 내용은 order.js에서 처리
router.use('/order', order);

// GET /product
// 로그인을 하지 않은 상태로 /product로 접속하면 /home으로 돌아가게 됩니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
// /product페이지에 들어가면 전체 상품 정보를 가져옵니다.
router.get('/', (req, res, next) => {
	console.log('/product 에 들어감');
	if (!req.session.user) {
		console.log("등록된 세션이 없어 홈으로 돌아갑니다");
		res.redirect('/home');
	}
	//session 내용의 유저를 User 변수로 함
	console.log(req.session.user.id);
	db.User.findOne({
		where: {id: req.session.user.id}
	})
	.then((selectedUser) => {
		var loginUser = selectedUser;
		console.log("로그인 성공 후 선택된 유저는:", loginUser.id);
		
		console.log('전체 상품을 가져옴');
		db.Product.findAll()
			.then((items) => {
				res.json(items);
			})
			.catch((err) => {
				console.error(err);
				next(err);
			});
	})
	.catch((err) => {
		console.log(err);
	})
	next();
});



// GET /product/category?kinds=liquor
// 카테고리별로 상품을 가져옵니다. 카테고리를 query.kinds를 통해 구분합니다.
router.get('/category', function (req, res, next) {
	db.Product.findAll({
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
	next();
});

// GET /product/detailview?name=초코파이
// 해당상품을 클릭하였을 때 해당상품에 대한 정보를 가져옵니다.
router.get('/detailview', function (req, res, next) {
	db.Product.findAll({
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
	next();
});

export default router;

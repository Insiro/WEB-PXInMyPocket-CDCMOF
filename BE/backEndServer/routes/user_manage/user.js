import express from 'express';
import db from '../../models/Index.js'
import crypto from 'crypto';

const User = db.User;
var router = express.Router();
var loginUser;

//로그인을 하지 않은 상태로 /user로 접속하면 /home으로 돌아가게 됩니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
router.all('/', (req, res, next) => {
	console.log('/home/user get에 들어감');
	console.log(req.session.user)
	if (!req.session.user) {
		res.redirect('/home');
	}
	else
	{	//session 내용의 유저를 User 변수로 함
		User.findOne({
			where: {id: req.session.user.id}
		})
		.then((selectedUser) => {
			loginUser = selectedUser;
			console.log("로그인 성공 후 user 페이지에 들어갔습니다 선택된 유저는:", loginUser.id);
			res.send(loginUser.id);
		})
		next();
	}

});

//home/user: 프론트 페이지가 필요합니다. 버튼을 통해 주문목록, 개인정보 수정, 내 게시글에 접속할 수 있습니다.
router.get('/', function (req, res) {
	console.log('home/user로 접속하였습니다.')
});


//GET home/user/orderlist 해당유저가 주문한 목록을 보여줍니다.
router.get('/orderlist', (req,res) => {

	console.log('주문목록페이지');
	console.log(loginUser);
	loginUser.getOrders()
		.then((items) =>{
			console.log(items);
		});
});

//POST home/user/change-userinfo: 개인 정보 수정내역을 보냅니다
router.post('/change-userinfo', (req, res) => {
	var new_password = req.body.newpassword;
	var check_password = req.body.checkpassword;
	if (new_password === check_password) {
		var salt = user.salt;
		var hashPassword = crypto
			.createHash('sha512')
			.update(new_password + salt)
			.digest('hex');

		loginUser.update({
			password: hashPassword
		});

		if (!req.body.new_serial_number)
			loginUser.update({
				serial_number: req.body.new_serial_number
			});

		if (!req.body.new_expire_date)
			loginUser.update({
				expire_date: req.body.new_expire_date
			});

	} else {
		res.send("비밀번호가 서로 일치하지 않습니다.")
	}

});

//GET home/user/mypost
router.get('/mypost', (req,res) => {
	console.log('작성글목록페이지');
	console.log(loginUser);
	loginUser.getPosts()
		.then((items) =>{
			console.log(items);
		});
});

//Get home/user/mypost?post_id=324234

//삭제 버튼을 눌렀을 때 Post home/user/mypost  바디로 넘어가는 부분 post_id=23423
router.post('/mypost', (req,res) => {
	console.log('작성글을 제거합니다.');
	db.Post.destroy({where : post_id = req.body.post_id});
});
//edit 버튼을 눌렀을 때 수정 창을 띄어줌, 그 후 수정하기 버튼을 누르면 => Post home/user/mypost  바디로 넘어가는 부분 post_id=23423
router.post('/mypost', (req,res) => {
	db.Post.findOne({
		where: {
			id: req.body.post_id,
		},
	})
	.then((selectedPost) => {
		selectedPost.update
	})
});


export default router;
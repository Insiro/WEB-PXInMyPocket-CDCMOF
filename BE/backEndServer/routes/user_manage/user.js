import express from 'express';
import cookiePaser from 'cookie-parser';
import expressSession from 'express-session';
import db from '../../models/Index.js'
import bodyParser from 'body-parser'
import crypto from 'crypto';

const User = db.User;
var router = express.Router();
var loginUser;
//bodyParser사용{}{}
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
//router.use(expressSession);

//로그인을 하지 않은 상태로 /user로 접속하면 /home으로 돌아가게 됩니다. 로그인을 했다면 User는 session 정보에 해당하는 유저가 됩니다.
router.get('/', (req, res, next) => {
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

//home/user: 프론트 페이지가 필요합니다. 버튼을 통해 주문목록, 개인정보 수정, 내 게시글에 접속할 수 있습니다.
router.get('/', function (req, res) {

});


//GET home/user/orderlist 해당유저가 주문한 목록을 보여줍니다.
router.get('/orderlist', (req,res) => {
	console.log(loginUser.getOrder());
});

//POST home/user/change-userinfo: 개인 정보 수정내역을 보냅니다
router.post('/change-userinfo', (req,res) => {
	
});

//GET home/user/post
router.get('/post', (req,res) => {
	console.log(loginUser.getPost());
});

export default router;
//home에서는 로그인과 회원가입, 비밀번호 찾기, 유저정보를 담당합니다.
import express from 'express';
import cookiePaser from 'cookie-parser';
import bodyParser from 'body-parser'
import expressSession from 'express-session';
import db from '../../models/Index.js'
import register from './register.js';
import finduser from './finduser.js';
import user from './user.js';
import crypto from 'crypto';

var router = express.Router();
const User = db.User;




//이미 로그인을 하여 session이 존재하면 /user로 이동 합니다.
router.get('/', (req, res, next) => {
	console.log('get에 들어감');
	if (req.session.user) {
		console.log(req.session.user);
		res.redirect('/home/user');
	}
	//html 파일을 보내주는 부분
	res.send("abc");
});



// POST home/login :로그인 기능입니다. login은 따로 페이지가 필요 없습니다. home에서 받아오게끔 설계, 로그인이 성공하면 /home/user로 이동
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/login', (req, res) => {
	console.log('login check');
	db.User.findOne({
		where: { id: req.body.id },
	})
		.then((user) => {
			var inputPassword = req.body.password;
			var salt = user.salt;
			var hashPassword = crypto
				.createHash('sha512')
				.update(inputPassword + salt)
				.digest('hex');

			if (user.password != hashPassword) {
				console.log('로그인 실패!');
				return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });
			}
			req.session.user = {
				id: req.body.id,
				name: req.body.name,
				authorized: true,
			};
			console.log('로그인 성공!');
			res.redirect('/home/user');
		})
		.catch((err) => {
			console.log(err);
			return res.json({ loginSuccess: false, message: '해당하는 유저가 없습니다.' });
		});
});

//GET home/logout : 로그아웃 기능입니다. 세션을 삭제하고 로그아웃합니다. 로그아웃된 상태로 /home 으로 복귀하게 됩니다.
router.get('/logout', (req,res) => {
    console.log('/process/logout 호출됨');
    if(req.session.user){
        console.log('로그아웃');
        req.session.destroy(function(err){
            if(err) throw err;
            console.log('세션 삭제하고 로그아웃됨');
            res.redirect('/home');
        });
    }
    else{
        console.log('로그인 상태 아님');
        res.redirect('/home');
    }
	
});

//register와 finduser는 페이지가 따로 존재합니다.
router.use('/register', register);
router.use('/finduser', finduser);
router.use('/user', user);
router.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

export default router;

// /home/register 페이지는 회원가입 기능을 담당합니다.
// front페이지를 만들어 주세요.
import express from 'express';
import db from '../../models/Index.js'
import bodyParser from 'body-parser'
import crypto from 'crypto';

var router = express.Router();

//bodyParser사용
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//POST home/register: 회원가입 기능입니다
router.post('/', (req, res) => {
	var inputPassword = req.body.password;
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
	.then((createdUser) => {
		res.send("회원가입이 완료되었습니다");
		console.log('user create success');
	})
	.catch((err) => {
		console.log('user create fail');
		console.log(err);
	})
	
})

router.get('/', function (req, res) {
  res.send('This is registerPage');
});

export default router;
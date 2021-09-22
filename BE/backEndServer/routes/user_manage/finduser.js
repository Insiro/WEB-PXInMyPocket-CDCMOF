// /home/finduser 에서는 유저의 아이디 및 비밀번호를 찾을 수 있습니다.
// 비밀번호 찾기의 경우 새로운 비밀번호를 메일로 보내드립니다.
import express from 'express';
import db from '../../models/Index.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer'

var router = express.Router();



//POST /home/finduser/find-id 
router.post('/find-id', (req, res) => {
	db.User.findOne({
		where: { serial_number: req.body.serial_number },
	})
		.then((user) => {
			console.log('check');
			var id = user.id;
			return res.json({ findIdSuccess: true, message: `귀하의 아이디는 ${id} 입니다.` });
		})
		.catch((err) => {
			console.log(err);
			return res.json({ findIdSuccess: false, message: '해당하는 유저가 없습니다.' });
		});
});

//POST /home/finduser/change-pw
//비밀번호를 찾는 경우는 신규 비밀번호를 해당하는 메일로 보내줍니다.
router.post('/change-pw', (req, res) => {
	db.User.findOne({
		where: {
			id: req.body.id,
			email: req.body.email,
		},
	})
		.then((user) => {
			var newPassword = Math.round(new Date().valueOf() * Math.random()) + '';
			var email = user.email;
			var salt = user.salt;
			var hashPassword = crypto
				.createHash('sha512')
				.update(newPassword + salt)
				.digest('hex');

			user.update({
				password: hashPassword
			});

			var transporter = nodemailer.createTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
            	secure : false,
            	requireTLS : true,
				auth: {
					user: 'wiovle2@gmail.com',
					pass: 'rlwls!1733',
				},
			});

			var mailOptions = {
				from: 'jwj0340@naver.com',
				to: `${email}`,
				subject: 'px어플리케이션 새로운 비밀번호',
				text: `새로운 비밀번호는 ${newPassword} 입니다. 로그인 후 비밀번호를 변경해 주세요`,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
				return res.json({ findIdSuccess: true, message: `메일을 전송하였습니다` });
		})
		.catch((err) => {
			console.log(err);
			return res.json({ findIdSuccess: false, message: '해당하는 유저가 없습니다.' });
		});
});

export default router;
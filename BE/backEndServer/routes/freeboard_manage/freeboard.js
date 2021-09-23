// </freeboard/*> 에서는 게시판 글쓰기 기능을 제공합니다. 
import express from 'express';
var router = express.Router();
import db from '../../models/Index.js'

var loginUser;
//로그인을 하지 않은 상태로 /freeboard로 접속하면 403 error를 보냅니다. 
router.all('/', (req, res, next) => {
	console.log('/freeboard에 들어감');
	if (!req.session.user) {
		console.log('로그인이 유효하지 않습니다');
		res.status(403).send();
	}else{	//session 내용의 유저를 User 변수로 함
		db.User.findOne({
			where: {id: req.session.user.id}
		})
		.then((selectedUser) => {
			loginUser = selectedUser;
			console.log("로그인 성공 후 freeboard 페이지에 들어갔습니다 선택된 유저는:", loginUser.id);
		})
		next();
	}
});

// POST /freeboard/
// 게시글을 생성합니다.
router.post('/', function (req, res, next) {
	var title = req.body.title;
	var content = req.body.content;

    console.log(req.session.user.id);
	db.Post.create({
        writer: req.session.user.id,
		title: title,
		content: content,
	})
	.then((post) => {
		res.json(post);
		console.log('posting success', post);
	})
	.catch((err) => {
		console.log('order fail');
		console.log(err);
	})
});

// GET /freeboard/detailview?post_id=32423423
// 해당 게시글 페이지를 보내줍니다.
router.get('/detailview', (req,res,next) => {
	var post_id = req.query.post_id;
	db.Post.findAll({
		where: {
			post_id: post_id,
		},
	})
		.then((post) => {
			res.json(post);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
	next();
})


// GET freeboard/delete/detailview?post_id=23423
// 게시글을 삭제합니다.
router.get('/delete/detailview', (req,res,next) => {
	console.log('작성글을 제거합니다.');
	db.Post.destroy({where : post_id = req.query.post_id});
});

// POST freeboard/edit/detailview?post_id=
// 게시글을 수정합니다.
router.post('/edit/detailview', (req,res,next) => {
	var post_id = req.query.post_id;
	var title = req.body.title;
	var content = req.body.content;

	db.Post.update({
		title: title,
		content: content,
	},{
		where: {post_id: post_id}
	})
	
	console.log("게시글 수정 완료");

});

export default router;

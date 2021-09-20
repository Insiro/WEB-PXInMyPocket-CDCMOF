import express from 'express';
import expressSession from 'express-session';
import home from './user_manage/home.js';
import product from './product_manage/product.js';
import admin from './admin_manage/admin.js';
import post from './post_manage/post.js';

var router = express.Router();

//expressSession 미들웨어 추가
router.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

router.use('/home', home);
router.use("/product", product);
router.use('/admin',admin);
router.use('/post',post);

export default router;
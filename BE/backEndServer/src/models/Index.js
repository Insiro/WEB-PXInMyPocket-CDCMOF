"use strict";

import Sequelize from "sequelize";
//const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

import config1 from "../config/config.json";
const config = config1[env];

import User from "./User.js";
import Product from "./Product.js";
import Post from "./Post.js";
import Order from "./Order.js";
import Notice from "./Notice.js";
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//db 객체에 테이블들을 추가
db.User = User(sequelize, Sequelize);
db.Product = Product(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);
db.Order = Order(sequelize, Sequelize);
db.Notice = Notice(sequelize, Sequelize);
console.log(db);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

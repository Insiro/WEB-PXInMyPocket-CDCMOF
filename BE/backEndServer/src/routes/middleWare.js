import db from "../models/Index.js";
import { forbidden, notAthorized } from "./error_handler.js";
export const checkSigned = (req, res, next) => {
  if (!req.session.user) {
    console.log("로그인이 유효하지 않습니다");
    notAthorized(req, res);
  } else next();
};
export const checkAdmin = async (req, res, next) => {
  if (!req.session.a) {
    console.log("로그인이 유효하지 않습니다");
    notAthorized(req, res);
  } else {
    try {
      const loginUser = await db.User.findOne({
        where: { id: req.session.user.id },
      });
      if (!loginUser.authority) forbidden(req, res);
      else next();
    } catch (error) {
      notAthorized(req, res);
    }
  }
  return;
};

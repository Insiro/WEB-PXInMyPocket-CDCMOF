import db from "../models/Index.js";

export const getUser = async (email) => {
  return await db.User.findOne({
    where: { email: email },
  });
};

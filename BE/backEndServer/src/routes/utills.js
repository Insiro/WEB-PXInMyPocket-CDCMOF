import db from "../models/Index.js";

export const getUser = async (id) => {
  return await db.User.findOne({
    where: { id: id },
  });
};

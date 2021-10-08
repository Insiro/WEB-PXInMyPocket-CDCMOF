export const checkSigned = async (req, res, next) => {
  if (!req.session.user) {
    console.log("로그인이 유효하지 않습니다");
    res.status(403).send();
  } else next();
};

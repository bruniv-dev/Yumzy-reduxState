import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Token Not Found. Login Again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An Error Occured" });
  }
};

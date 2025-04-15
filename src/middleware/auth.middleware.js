const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "Chưa được cung cấp Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(`Lỗi ở xác thực người dùng: ${err.message}`);
    res.status(500).json({ message: "Lỗi máy chủ cục bộ" });
  }
};

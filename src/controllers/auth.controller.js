const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/auth.util");

module.exports.signup = async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;
  try {
    if (!email || !username || !firstName || !lastName || !password) {
      return res.status(400).json({ mess: "Tất cả các trường là bắt buộc" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ mess: "Email đã tồn tại" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ mess: "Username đã tồn tại" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const user = await newUser.save();

    generateToken(user._id, res);

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.log(`Lỗi đăng ký: ${err.message}`);
    res.status(500).json({ mess: "Lỗi máy chủ nội bộ" });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ mess: "Tất cả các trường là bắt buộc" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ mess: "Mật khẩu không đúng" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    });
  } catch (err) {
    console.log(`Lỗi đăng nhập: ${err.message}`);
    res.status(500).json({ mess: "Lỗi máy chủ nội bộ" });
  }
};

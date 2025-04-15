const User = require("../models/user.model");
const { redisClient } = require("../config/redis.config");

module.exports.getAllUsers = async (req, res) => {
  try {
    const cachedUsers = await redisClient.get("base-expressjs-user");
    if (cachedUsers) {
      return res.status(200).json({ users: JSON.parse(cachedUsers) });
    }
    const users = await User.find()
      .select("-__v -createdAt -updatedAt -password")
      .lean();
    await redisClient.setEx("base-expressjs-user", 3600, JSON.stringify(users));
    res.status(200).json({ users: users });
  } catch (err) {
    console.log(`Lỗi lấy tất cả người dùng: ${err.message}`);
    res.status(500).json({ mess: "Lỗi máy chủ nội bộ" });
  }
};

module.exports.updateUser = async (req, res) => {
  const { firstName, lastName, username } = req.body;
  const { userId } = req.params;
  const currentUserId = req.user._id;

  try {
    if (!currentUserId.equals(userId)) {
      return res.status(401).json({ mess: "Không có quyền chỉnh sửa" });
    }

    console.log(firstName);
    console.log(lastName);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, username },
      {
        new: true,
        runValidators: true,
        select: "_id firstName lastName username email",
      }
    );

    if (!updatedUser) {
      return res.status(400).json({ mess: "Chỉnh sửa thất bại" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.log(`Lỗi cập nhật thông tin người dùng: ${err.message}`);
    res.status(500).json({ mess: "Lỗi máy chủ nội bộ" });
  }
};

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ mess: "Yêu cầu userId" });
    }

    const user = await User.findById(userId).select(
      "-__v -createdAt -updatedAt -password"
    );

    if (!user) {
      return res.status(404).json({ mess: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ user: user });
  } catch (err) {
    console.log(`Lỗi xóa người dùng: ${err.message}`);
    res.status(500).json({ mess: "Lỗi máy chủ nội bộ" });
  }
};

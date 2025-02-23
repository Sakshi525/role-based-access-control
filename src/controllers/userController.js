const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { $or: [{ firstName: { $regex: search, $options: "i" } }] } : {};
    const users = await User.find(filter).populate("role", "roleName accessModules").select("firstName lastName email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkUserAccess = async (req, res) => {
  try {
    const { userId, module } = req.body;
    const user = await User.findById(userId).populate("role", "accessModules");
    res.json({ hasAccess: user.role.accessModules.includes(module) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

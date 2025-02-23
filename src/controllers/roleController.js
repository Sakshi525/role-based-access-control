const Role = require("../models/Role");

exports.createRole = async (req, res) => {
  try {
    const { roleName, accessModules } = req.body;
    const newRole = new Role({ roleName, accessModules });
    await newRole.save();
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { roleName, accessModules } = req.body;
    const role = await Role.findByIdAndUpdate(req.params.id, { roleName, accessModules }, { new: true });
    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json({ message: "Role updated successfully", role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAccessModule = async (req, res) => {
  try {
    const { module } = req.body;
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    if (!role.accessModules.includes(module)) {
      role.accessModules.push(module);
      await role.save();
      return res.json({ message: "Module added successfully", role });
    }

    res.status(400).json({ message: "Module already exists" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeAccessModule = async (req, res) => {
  try {
    const { module } = req.body;
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    role.accessModules = role.accessModules.filter(m => m !== module);
    await role.save();

    res.json({ message: "Module removed successfully", role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

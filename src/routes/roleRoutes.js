const express = require("express");
const { 
  createRole, getRoles, updateRole, deleteRole, 
  addAccessModule, removeAccessModule 
} = require("../controllers/roleController");
const router = express.Router();

router.post("/", createRole);
router.get("/", getRoles);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);
router.put("/:id/add-module", addAccessModule);
router.put("/:id/remove-module", removeAccessModule);

module.exports = router;

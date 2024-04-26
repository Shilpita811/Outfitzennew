const express = require("express");
const { sellerRequest, getAllSellerRequest, deleteRequest, updateRequest, getSingleRequest } = require("../controllers/sellerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/seller").post(sellerRequest);
router.route("/admin/request").get(isAuthenticatedUser, authorizeRoles("admin"), getAllSellerRequest);
router.route("/admin/request/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteRequest).put(isAuthenticatedUser, authorizeRoles("admin"),updateRequest).get(isAuthenticatedUser, authorizeRoles("admin"), getSingleRequest);



module.exports = router
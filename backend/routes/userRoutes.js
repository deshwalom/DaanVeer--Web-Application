const express=require("express");
const{home, registerUser,loginUser,logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile}=require("../controller/userController");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");
const router=express.Router();
router.route("/").get(home);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
module.exports=router;
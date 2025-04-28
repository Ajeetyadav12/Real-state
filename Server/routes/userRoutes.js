import express from "express";
import userController from "../controllers/userController.js"
import middleware from "../middleware/auth.js"



const router = express()


router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/getUserInfo",middleware.auth,userController.getUserInfo)


export default router;
import express from "express";
import propertyController from "../controllers/propertyControllers.js"
import uploads from "../middleware/multer.js"



const router = express()


router.post("/addProperty",uploads.single('imageUrls'),propertyController.addProperty)
router.delete("/deleteProperty/:id",propertyController.deleteProperty)
router.put("/updateProperty/:id", uploads.single("imageUrls"),propertyController.updateProperty)
router.get("/getAllProperty",propertyController.getAllProperty)


export default router;
import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.get("/", indexCtrl.locationCtrl.findAll);
router.get("/:id", indexCtrl.locationCtrl.findOne);
router.post("/", indexCtrl.locationCtrl.create);
router.put("/:id", indexCtrl.locationCtrl.update);
router.delete("/:id", indexCtrl.locationCtrl.deleted);

export default router

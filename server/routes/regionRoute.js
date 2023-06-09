import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.get("/", indexCtrl.regionCtrl.findAll);
router.get("/:id", indexCtrl.regionCtrl.findOne);
router.post("/", indexCtrl.regionCtrl.create);
router.put("/:id", indexCtrl.regionCtrl.update);
router.delete("/:id", indexCtrl.regionCtrl.deleted);

export default router;

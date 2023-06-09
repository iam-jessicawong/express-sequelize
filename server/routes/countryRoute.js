import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.get("/", indexCtrl.countryCtrl.findAll);
router.get("/:id", indexCtrl.countryCtrl.findOne);
router.post("/", indexCtrl.countryCtrl.create);
router.put("/:id", indexCtrl.countryCtrl.update);
router.delete("/:id", indexCtrl.countryCtrl.deleted);

export default router;

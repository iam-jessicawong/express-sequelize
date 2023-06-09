import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.get("/", indexCtrl.jobHistoryCtrl.findAll);
router.get("/:employee_id", indexCtrl.jobHistoryCtrl.findOne);
router.post("/", indexCtrl.jobHistoryCtrl.create);
router.put("/:employee_id/:start_date", indexCtrl.jobHistoryCtrl.update);
router.delete("/:employee_id/:start_date", indexCtrl.jobHistoryCtrl.deleted);

export default router

import { Router } from "express";
import { addJob, getSingleJob, listJobs } from "../controllers/jobController.js";

const router = Router();

router.get("/", listJobs);
router.get("/:id", getSingleJob);
router.post("/", addJob);

export default router;

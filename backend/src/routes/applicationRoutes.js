import express from 'express';

import{
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeEmployer } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:jobId", protect, applyForJob);

router.get("/my", protect, getMyApplications);

router.get(
    "/job/:jobId",
    protect,
    authorizeEmployer,
    getJobApplications
);

router.put(
    "/:applicationId",
    protect,
    authorizeEmployer,
    updateApplicationStatus
);

export default router;
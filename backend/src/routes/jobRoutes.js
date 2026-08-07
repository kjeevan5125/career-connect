import express from "express";
import { 
    getJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeEmployer } from "../middleware/roleMiddleware.js";


const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/",
    protect,
    authorizeEmployer,
    createJob
);
router.put("/:id", 
    protect,
    authorizeEmployer,
    updateJob
);  
router.delete("/:id", 
    protect,
    authorizeEmployer,
    deleteJob
);

export default router;
import { Router } from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controllers/enquiry.controller.js";
import { validateEnquiry } from "../middleware/validateEnquiry.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// Public route: visitors can submit enquiries.
router.post("/", validateEnquiry, createEnquiry);

// Protected routes: only an authenticated admin can access these.
router.get("/", requireAdmin, getEnquiries);
router.get("/:id", requireAdmin, getEnquiryById);
router.patch("/:id", requireAdmin, updateEnquiry);
router.put("/:id", requireAdmin, updateEnquiry);
router.delete("/:id", requireAdmin, deleteEnquiry);

export default router;
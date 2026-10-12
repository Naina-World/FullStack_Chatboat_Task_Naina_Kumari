import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Enquiry from "../models/Enquiry.js";

const isValidId = (id: string): boolean =>
  mongoose.isValidObjectId(id);

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Unknown error";

// CREATE: POST /api/enquiries
export const createEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: "Your enquiry was submitted successfully.",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL: GET /api/enquiries
// Supports search, user-type filter, and status filter.
export const getEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q, userType, status } = req.query;

    const filter: Record<string, unknown> = {};

    if (typeof userType === "string") {
      if (!["Student", "Customer", "Other"].includes(userType)) {
        res.status(400).json({
          success: false,
          message: "Invalid user type filter.",
        });
        return;
      }

      filter.userType = userType;
    }

    if (typeof status === "string") {
      if (!["New", "Contacted", "In Progress", "Closed"].includes(status)) {
        res.status(400).json({
          success: false,
          message: "Invalid status filter.",
        });
        return;
      }

      filter.status = status;
    }

    if (typeof q === "string" && q.trim()) {
      const escapedQuery = q.trim().slice(0, 100).replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { name: { $regex: escapedQuery, $options: "i" } },
        { email: { $regex: escapedQuery, $options: "i" } },
        { interest: { $regex: escapedQuery, $options: "i" } },
      ];
    }

    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE: GET /api/enquiries/:id
export const getEnquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
      return;
    }

    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE: PATCH /api/enquiries/:id
// Admins can update enquiry details and status.
export const updateEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
      return;
    }

    const allowedFields = [
      "name",
      "email",
      "phone",
      "userType",
      "interest",
      "message",
      "status",
    ];

    const body = req.body as Record<string, unknown>;
    const update: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (Object.hasOwn(body, field)) {
        update[field] = body[field];
      }
    }

    if (Object.keys(update).length === 0) {
      res.status(400).json({
        success: false,
        message: "Provide at least one supported field to update.",
      });
      return;
    }

    // Validate supplied fields; do not permit unknown fields.
    for (const field of Object.keys(body)) {
      if (!allowedFields.includes(field)) {
        res.status(400).json({
          success: false,
          message: `Field '${field}' cannot be updated.`,
        });
        return;
      }
    }

    if (
      "name" in update &&
      (typeof update.name !== "string" ||
        update.name.trim().length < 2 ||
        update.name.trim().length > 100)
    ) {
      res.status(400).json({
        success: false,
        message: "Name must contain 2–100 characters.",
      });
      return;
    }

    if (
      "email" in update &&
      (typeof update.email !== "string" ||
        update.email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(update.email.trim()))
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
      return;
    }

    if (
      "phone" in update &&
      (typeof update.phone !== "string" ||
        !/^[+()\d\s.-]{7,25}$/.test(update.phone.trim()))
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
      return;
    }

    if (
      "userType" in update &&
      !["Student", "Customer", "Other"].includes(
        String(update.userType)
      )
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid user type.",
      });
      return;
    }

    if (
      "interest" in update &&
      (typeof update.interest !== "string" ||
        update.interest.trim().length > 150)
    ) {
      res.status(400).json({
        success: false,
        message: "Interest must not exceed 150 characters.",
      });
      return;
    }

    if (
      "message" in update &&
      (typeof update.message !== "string" ||
        update.message.trim().length < 5 ||
        update.message.trim().length > 2000)
    ) {
      res.status(400).json({
        success: false,
        message: "Message must contain 5–2000 characters.",
      });
      return;
    }

    const validStatuses = ["New", "Contacted", "In Progress", "Closed"];

    if (
      "status" in update &&
      !validStatuses.includes(String(update.status))
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
      return;
    }

    if ("name" in update) update.name = (update.name as string).trim();
    if ("email" in update) {
      update.email = (update.email as string).trim().toLowerCase();
    }
    if ("phone" in update) update.phone = (update.phone as string).trim();
    if ("interest" in update) {
      update.interest = (update.interest as string).trim();
    }
    if ("message" in update) {
      update.message = (update.message as string).trim();
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully.",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE: DELETE /api/enquiries/:id
export const deleteEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    if (!isValidId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
      return;
    }

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
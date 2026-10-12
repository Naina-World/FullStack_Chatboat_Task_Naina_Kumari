import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found.`,
  });
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "The submitted data is invalid.",
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid data format.",
    });
    return;
  }

  // Log technical details on the server, not in the public response.
  console.error("API error:", error);

  res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
};

import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "node:crypto";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const adminToken = process.env.ADMIN_TOKEN;
  const authorization = req.get("Authorization");

  if (!adminToken) {
    res.status(500).json({
      success: false,
      message: "Admin authentication is not configured.",
    });
    return;
  }

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Admin authentication is required.",
    });
    return;
  }

  const suppliedToken = authorization.slice(7).trim();

  const supplied = Buffer.from(suppliedToken);
  const expected = Buffer.from(adminToken);

  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  ) {
    res.status(401).json({
      success: false,
      message: "Invalid admin credentials.",
    });
    return;
  }

  next();
};

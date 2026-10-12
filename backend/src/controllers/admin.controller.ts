import type { Request, Response } from "express";

export const adminLogin = (req: Request, res: Response): void => {
  const { token } = req.body as { token?: string };
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    res.status(500).json({
      success: false,
      message: "Admin authentication is not configured.",
    });
    return;
  }

  if (!token || token !== adminToken) {
    res.status(401).json({
      success: false,
      message: "Invalid admin token.",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: { token: adminToken },
  });
};

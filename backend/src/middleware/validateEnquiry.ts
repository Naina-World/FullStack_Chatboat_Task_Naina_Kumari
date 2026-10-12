import type { Request, Response, NextFunction } from "express";

const validUserTypes = ["Student", "Customer", "Other"];

export const validateEnquiry = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, phone, userType, interest, message } = req.body ?? {};

  const fields = { name, email, phone, userType, interest, message };

  for (const [field, value] of Object.entries(fields)) {
    if (typeof value !== "string" || !value.trim()) {
      res.status(400).json({
        success: false,
        message: `${field} is required and must be text.`,
      });
      return;
    }
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanPhone = phone.trim();
  const cleanInterest = interest.trim();
  const cleanMessage = message.trim();

  if (cleanName.length < 2 || cleanName.length > 100) {
    res.status(400).json({
      success: false,
      message: "Name must contain 2–100 characters.",
    });
    return;
  }

  if (
    cleanEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
  ) {
    res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
    return;
  }

  if (
    cleanPhone.length > 25 ||
    !/^[+()\d\s.-]{7,25}$/.test(cleanPhone)
  ) {
    res.status(400).json({
      success: false,
      message: "Please provide a valid phone number.",
    });
    return;
  }

  if (!validUserTypes.includes(userType)) {
    res.status(400).json({
      success: false,
      message: "User type must be Student, Customer, or Other.",
    });
    return;
  }

  if (cleanInterest.length > 150) {
    res.status(400).json({
      success: false,
      message: "Interest must not exceed 150 characters.",
    });
    return;
  }

  if (cleanMessage.length < 5 || cleanMessage.length > 2000) {
    res.status(400).json({
      success: false,
      message: "Message must contain 5–2000 characters.",
    });
    return;
  }

  req.body = {
    name: cleanName,
    email: cleanEmail.toLowerCase(),
    phone: cleanPhone,
    userType,
    interest: cleanInterest,
    message: cleanMessage,
  };

  next();
};
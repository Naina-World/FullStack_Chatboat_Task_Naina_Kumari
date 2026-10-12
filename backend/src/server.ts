
import "dotenv/config";

import express, { type Request, type Response } from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorHandler.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

app.disable("x-powered-by");

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "20kb" }));

// API health check
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "DroneTV Assistant API is running.",
  });
});

// Admin login: POST /api/admin/login
app.use("/api/admin", adminRoutes);

// Enquiry APIs: POST /api/enquiries is public.
// Protect listing, viewing, updating, and deleting in the routes.
app.use("/api/enquiries", enquiryRoutes);

// Keep error handlers last.
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the backend:", error);
    process.exit(1);
  }
};

void startServer();

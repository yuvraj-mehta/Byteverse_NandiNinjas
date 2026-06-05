import express from "express";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import pyqRouter from "./routes/pyqRouter.js";
import userRouter from "./routes/userRouter.js";
import healthRouter from "./routes/healthRouter.js";
import expressFileupload from "express-fileupload";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

export const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config({ path: path.join(__dirname, "config", "config.env") });

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

const allowedOrigins = new Set([
  ...parseOrigins(process.env.FRONTEND_URL),
  ...parseOrigins(process.env.FRONTEND_URLS),
  "http://localhost:5173",
  "http://localhost:3000",
  "https://byteverse-nandi-ninjas.vercel.app",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(
  expressFileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/pyq", pyqRouter);

notifyUsers();
removeUnverifiedAccounts();
connectDB();

app.use(errorMiddleware);

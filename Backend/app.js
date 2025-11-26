import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";
import { secureApiMiddleware, setBrowserIdentification } from "./middlewares/securityMiddleware.js";

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Middleware Setup
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://yojanamitr-gov.vercel.app",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Set browser identification for all routes
app.use(setBrowserIdentification);

// Apply API security for API routes only
app.use("/api", secureApiMiddleware);

// Declare API routes
app.use("/api", apiRoutes);

// Health check api
app.get("/", (req, res) => {
    res.send("API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

export { app };
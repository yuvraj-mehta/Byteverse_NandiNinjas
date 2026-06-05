import express from "express";
import {
  basicHealthCheck,
  fullHealthCheck,
  readinessCheck,
  livenessCheck,
} from "../controllers/healthController.js";

const healthRouter = express.Router();

/**
 * GET /api/v1/health
 * Basic health check - quick response to verify server is running
 */
healthRouter.get("/", basicHealthCheck);

/**
 * GET /api/v1/health/full
 * Comprehensive health check including database status
 */
healthRouter.get("/full", fullHealthCheck);

/**
 * GET /api/v1/health/ready
 * Readiness probe - returns 200 if ready to handle traffic
 * Used by orchestration systems like Kubernetes
 */
healthRouter.get("/ready", readinessCheck);

/**
 * GET /api/v1/health/live
 * Liveness probe - returns 200 if process is still running
 * Used by orchestration systems like Kubernetes
 */
healthRouter.get("/live", livenessCheck);

export default healthRouter;

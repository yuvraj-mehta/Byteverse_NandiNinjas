import mongoose from "mongoose";

/**
 * Basic health check - returns immediately
 * Used for simple liveness probes
 */
export const basicHealthCheck = (req, res) => {
  try {
    res.status(200).json({
      status: "OK",
      message: "Server is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message,
    });
  }
};

/**
 * Full health check - checks database connectivity
 * Used for readiness probes
 */
export const fullHealthCheck = async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    let dbStatus = "DISCONNECTED";
    let dbHealthy = false;

    switch (dbState) {
      case 0:
        dbStatus = "DISCONNECTED";
        break;
      case 1:
        dbStatus = "CONNECTED";
        dbHealthy = true;
        break;
      case 2:
        dbStatus = "CONNECTING";
        break;
      case 3:
        dbStatus = "DISCONNECTING";
        break;
      default:
        dbStatus = "UNKNOWN";
    }

    const healthData = {
      status: dbHealthy ? "OK" : "DEGRADED",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      services: {
        server: "HEALTHY",
        database: {
          status: dbStatus,
          healthy: dbHealthy,
          connected: dbHealthy,
        },
      },
    };

    const statusCode = dbHealthy ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Readiness check - checks if service is ready to handle traffic
 * Used for Kubernetes readiness probes
 */
export const readinessCheck = async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const isReady = dbState === 1; // Only ready if connected

    res.status(isReady ? 200 : 503).json({
      ready: isReady,
      timestamp: new Date().toISOString(),
      checks: {
        server: "ready",
        database: isReady ? "ready" : "not_ready",
      },
    });
  } catch (error) {
    res.status(503).json({
      ready: false,
      error: error.message,
    });
  }
};

/**
 * Liveness check - checks if service is still running
 * Used for Kubernetes liveness probes
 */
export const livenessCheck = (req, res) => {
  try {
    res.status(200).json({
      alive: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      alive: false,
      error: error.message,
    });
  }
};

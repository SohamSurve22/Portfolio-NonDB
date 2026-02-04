
import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Routes are now deprecated as the application is fully static/client-side.
  // We keep this function to satisfy the server entry point contract.

  app.get(/^\/api\/.*/, (req, res) => {
    res.status(404).json({ message: "API is deprecated. Application is now static." });
  });

  return httpServer;
}

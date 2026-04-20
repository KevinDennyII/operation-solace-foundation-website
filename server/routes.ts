import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertEventSchema } from "@shared/schema";
import { z } from "zod";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "solace2025";

function checkAuth(req: { headers: Record<string, string | string[] | undefined> }, res: any): boolean {
  const password = req.headers["x-admin-password"] as string;
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/events", async (_req, res) => {
    try {
      const eventsList = await storage.getEvents();
      res.json(eventsList);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/events", async (req, res) => {
    try {
      if (!checkAuth(req, res)) return;

      const { title, date, time, location, description, flyerData } = req.body;

      const input = insertEventSchema.parse({
        title,
        date,
        time,
        location,
        description,
        flyerUrl: flyerData || undefined,
      });

      const event = await storage.createEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/admin/events/:id", async (req, res) => {
    try {
      if (!checkAuth(req, res)) return;

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }

      const { title, date, time, location, description, flyerData, clearFlyer } = req.body;

      const updates: Record<string, string | null | undefined> = {};
      if (title !== undefined) updates.title = title;
      if (date !== undefined) updates.date = date;
      if (time !== undefined) updates.time = time;
      if (location !== undefined) updates.location = location;
      if (description !== undefined) updates.description = description;
      if (flyerData) updates.flyerUrl = flyerData;
      if (clearFlyer) updates.flyerUrl = null;

      const event = await storage.updateEvent(id, updates);
      res.json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/admin/events/:id", async (req, res) => {
    try {
      if (!checkAuth(req, res)) return;

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }

      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/verify", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });

  return httpServer;
}

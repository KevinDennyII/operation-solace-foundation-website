import type { Express } from "express";
import type { Server } from "http";
import path from "path";
import fs from "fs";
import multer from "multer";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertEventSchema } from "@shared/schema";
import { z } from "zod";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "solace2025";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `event-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

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

  app.post("/api/admin/events", upload.single("flyer"), async (req, res) => {
    try {
      const password = req.headers["x-admin-password"] as string;
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const flyerUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const input = insertEventSchema.parse({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description,
        flyerUrl,
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

  app.patch("/api/admin/events/:id", upload.single("flyer"), async (req, res) => {
    try {
      const password = req.headers["x-admin-password"] as string;
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }

      const updates: Record<string, string | undefined> = {};
      if (req.body.title) updates.title = req.body.title;
      if (req.body.date) updates.date = req.body.date;
      if (req.body.time) updates.time = req.body.time;
      if (req.body.location) updates.location = req.body.location;
      if (req.body.description) updates.description = req.body.description;
      if (req.file) updates.flyerUrl = `/uploads/${req.file.filename}`;
      if (req.body.clearFlyer === "true") updates.flyerUrl = undefined;

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
      const password = req.headers["x-admin-password"] as string;
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Unauthorized" });
      }

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

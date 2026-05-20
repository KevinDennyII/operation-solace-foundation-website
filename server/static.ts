import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const oneYearInMs = 31536000000;
  const thirtyDaysInMs = 2592000000;

  app.use(
    "/assets",
    express.static(path.resolve(distPath, "assets"), {
      immutable: true,
      index: false,
      maxAge: oneYearInMs,
    }),
  );

  app.use(
    "/images",
    express.static(path.resolve(distPath, "images"), {
      immutable: false,
      index: false,
      maxAge: thirtyDaysInMs,
    }),
  );

  app.use(
    express.static(distPath, {
      index: false,
      maxAge: 0,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
